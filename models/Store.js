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
    }   
});

//Pre Hook for generating a custom slug whenever a new store is created
storeSchema.pre('save', function(next){
    if (!this.isModified('name')) {
        next(); //if the name is not modified, skip it
        return; //stop this function from running
    }
    this.slug = slug(this.name);
    next(); 
    // TODO make more resiliant so slugs are unique
})

module.exports = mongoose.model('Store', storeSchema);

