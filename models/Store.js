const mongoose = require('mongoose');
const slug = require('slugs');
const Schema = mongoose.Schema;

const storeSchema = new Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        maxLength: 40,
        required: 'Please enter a store name!'
    },
    slug: String,
    description: {
        type: String,
        trim: true,
        maxLength: 500,

    },
    photo: String,
    tags: [String],
    created: {
        type: Date,
        default: Date.now
    },
    location: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: [{
            type: Number, 
            required: 'You must supply coordinates'
        }],
        address: {
            type: String,
            required: 'You must supply an address.'
        } 
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: 'You must supply an`d author'
    }
});

//Define our indexes
storeSchema.index({
    name: 'text',
    description: 'text'
});

storeSchema.index({
    location: '2dsphere'
})

//Pre Hook for generating a custom slug whenever a new store is created
storeSchema.pre('save', async function(next){
    if (!this.isModified('name')) {
        next(); //if the name is not modified, skip it
        return; //stop this function from running
    }
    this.slug = slug(this.name);
    //To fin other stores that have same 'slug', 'slug-1', 'slug-2'...
    const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
    const storesWithSlug = await this.constructor.find({slug: slugRegEx})
    if(storesWithSlug.length) {
        this.slug = `${this.slug}-${storesWithSlug.length + 1}`;
    }   
    next(); 
    // TODO make more resiliant so slugs are unique
})

storeSchema.statics.getTagsList = function(){
    return this.aggregate([
        { $unwind: '$tags' }, //> Returns a list of documents where each document is asigned to 1 tag, meaning that a restaurant with 3 tags is included 3 times.
        { $group: { _id: '$tags', count: { $sum: 1}}}, //> groups the previous list by tag, and adds a property of count with the sum.
        { $sort: { count: -1}} //> Order more to less
    ]);
}

storeSchema.statics.getTopStores = function(){
    return this.aggregate([
       // Lookup stores and populate their reviews
       {
        $lookup: {
            from: 'reviews',
            localField: '_id',
            foreignField: 'store',
            as: 'reviews'
        }
      }, 
       // filter for only items that have 2 or more reviews
        {
          $match: { 'reviews.1': { $exists: true}}
      },
       // Add the average reviews field and select photo, name, reviews and avgRating fields.
        {
        $project: {
          photo: '$$ROOT.photo',
          name: '$$ROOT.name',
          reviews: '$$ROOT.reviews',
          slug: '$$ROOT.slug',
          avgRating: { $avg: '$reviews.rating' } 
        }
      },
       // sort it by our avg field, highest reviews first
        {
            $sort: {avgRating: -1}
        },
       // limit to 10
        {
            $limit: 10
        }
    ]);
}

module.exports = mongoose.model('Store', storeSchema);

