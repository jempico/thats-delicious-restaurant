const { text } = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: 'You must supply an author!'
    },
    store : {
        type: mongoose.Schema.ObjectId,
        ref: 'Store',
        required: 'You must supply a store!'
    },
    text : {
        type: String,
        required: 'Your review must have text!'
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    }
})

module.exports = mongoose.model('Review', reviewSchema);
