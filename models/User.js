const mongoose = require('mongoose');
const slug = require('slugs');
const Schema = mongoose.Schema;
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Invalid Email Address'],
        required: 'Please suppy and email address'
    },
    name: {
        type: String,
        required: 'Plase suplly a name',
        trim: true
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
})


userSchema.virtual('gravatar').get(function(){ //>Using a propper function to bind this.
    const hash = md5(this.email);
    return `https://gravatar.com/avatar/${hash}?s=200`;
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email'});  //>> Setting Passport username to "email" (instead of the default's 'username')
userSchema.plugin(mongodbErrorHandler, )
module.exports = mongoose.model('User', userSchema);