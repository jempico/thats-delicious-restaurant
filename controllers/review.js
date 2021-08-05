const Review = require('../models/Review');

exports.addReview =  async(req,res) => {
    //First add the author and store_id to the req.body (the text and rating already comes in from the form)
    req.body.author = req.user._id;
    req.body.store = req.params.id;
    const newReview = new Review(req.body)
    await newReview.save();
    req.flash('success', 'Review Saved!')
    res.redirect('back')
};
