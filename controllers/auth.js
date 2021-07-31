const passport = require('passport');

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
        next();
        return
    } req.flash('error', 'Ooops you must be logged in');
    res.redirect('/login');
}