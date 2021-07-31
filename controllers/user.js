const mongoose = require('mongoose');

class userController {
    loginForm(req,res) {
        res.render('login', {title: 'Login'})
    }
    registerForm(req,res) {
        res.render('register', {title: 'Register'});
    }
}

module.exports = new userController;
