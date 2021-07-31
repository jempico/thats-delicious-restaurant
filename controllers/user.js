const mongoose = require('mongoose');
const User = require('../models/User');
const promosify = require('es6-promisify');

class userController {
    loginForm(req,res) {
        res.render('login', {title: 'Login'})
    }
    registerForm(req,res) {
        res.render('register', {title: 'Register'});
    }
    async register(req,res,next) {
        const user = new User({ email: req.body.email, name: req.body.name});
        const register = promosify(User.register, User) //> Register method comes from passportLocalMongoose library, which saves the hashed password to the database.
        await register(user, req.body.password) //> Promosifying register method, cuz it's callback based, and passing the submited password to save the hash.
        next(); //> pass to authController.login
    }  
}

module.exports = new userController;
