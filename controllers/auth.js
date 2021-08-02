const passport = require('passport');
const crypto = require('crypto');
const User = require('../models/User');
const promisify = require('es6-promisify');
const mail = require('../handlers/mail');

exports.login = passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Failed Login!',
    successRedirect: '/',
    successFlash: 'You are now logged in!'
});

exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'You are now logged out!')
    res.redirect('/');
}

exports.isLoggedIn = (req, res, next) => {
    // Checking if the user is authenticated with Passport's method
    if(req.isAuthenticated()){
        return next();
    } 
    else req.flash('error', 'Ooops you must be logged in');
    res.redirect('/login');
}

exports.forgot = async(req,res) => {
    const user = await User.findOne({email: req.body.email})
    //1. See if the user exists with the given email
    if(!user){
        req.flash('error', 'Sorry, no account with that email exists!') //> Depending on the website, some would about telling that the email doesn't exist in the db for security reasons
        return res.redirect('/login');
    }
    //2. Set reset tokens and expiry on their account
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordExpires = Date.now() + 3600000; //1 hour from now
    await user.save();
    //3. Send them an email with the token
    const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
    await mail.send({
        user,
        subject: 'Password reset',
        resetURL,
        filename: 'password-reset', //> Looks for pug file to render
    });
    req.flash('success', `You have been emailed a password reset link.`)
    res.redirect('/login');
}

exports.reset = async(req,res) => {
    //1. See if the user with that token exists
    //2. Check is the token has expired
    const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now()} //> If the expiration date stored is not greater than the current time, means it has expired.
    })
    if(!user){
        req.flash('error', 'Password reset token is invalid or has expired')
        return res.redirect('/login')
    }
    //3.If there is a user, show the reset password form
    res.render('reset', {title: 'Reset your password', user: user});
}

exports.update = async(req,res) => {
    //1. Find the user and double check if the token hasn't expired
    const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now()} //> If the expiration date stored is not greater than the current time, means it has expired.
    })
    if(!user){
        req.flash('error', 'Password reset token is invalid or has expired')
        return res.redirect('/login')
    }

    //Updating the user's password with setPassword() method made available by the passportLocalMongoose plugin in User model. Need to promisify it cuz it's callback-based.
    const setPassword = promisify(user.setPassword, user);
    await setPassword(req.body.password);

    //Gets rid of token and expiry
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    const userUpdated = await user.save();

    //Logs the user in
    await req.login(userUpdated); //> Login method comes from Passport
    req.flash('Success', 'Your password has been updated. You are now logged in!');
    res.redirect('/');

}