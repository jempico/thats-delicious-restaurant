const Store = require('../models/Store');

const confirmOwner = (store,user) => {
    if (!store.author.equals(user._id)) {
        throw Error('You must own a store in order to edit it');
    } 
};

class storeController {
    // Homepage
    homePage(req, res) {
        req.flash('error', 'Something happened')
        res.render('index')
    }
    addStore(req,res){
        res.render('editStore', { title: 'Add Store'})
    }
    async createStore(req,res){
        //First grab the current user's id and set it as the store's author.
        req.body.author = req.user._id; 
        //Then check if there's any photo uploaded and set it as the store's photo
        if (req.file) {
            req.body.photo = req.file.filename;
        } 
        const store = await Store.create(req.body) //>With all the information above, create the store.
        req.flash('success', `Succesfully created ${store.name}. Care to leave a review?` );
        res.status(200).redirect(`/store/${store.slug}`);
    }
    async getStores(req,res){
        //1. Query the database for a list of all stores
        const stores = await Store.find();
        res.render('stores', {title: 'Stores', stores})
    }
    async editStore(req,res){
        const store = await Store.findById(req.params.id)
        //Confirm they are the owner of the store
        confirmOwner(store, req.user);
        res.render('editStore', {title: 'Edit Store', store})
    }
    async updateStore(req,res){
        if (req.file) {
            req.body.photo = req.file.filename;
        }       
        const store = await Store.findOneAndUpdate({_id: req.params.id}, req.body, {
            new: true, //return the new store instead of the old one
            runValidators: true //to validate the new data against the model's schema and avoid empty name and description.
        })
        req.flash('success', `Succesfully updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View Store </a>`);
        res.status(200).redirect(`/stores/${store._id}/edit`);
    }
    async getStorebySlug(req,res,next){
        const store = await Store.findOne({slug: req.params.slug}).populate('author');
        console.log(store);
        //If there is no store with the requested slug, pass onto the next function in app.js (render 404 Error handling)
        if(!store) return next();
        else res.render('store', {store, title: store.name});
    }
    async getStoresByTag(req,res){
        const tag = req.params.tag;
        const tagQuery = tag || { $exists: true}; // > If there's no tag specified as a parameter, return anything with a tag.
        const tagsPromise = Store.getTagsList();
        const storesPromise = Store.find({ tags: tagQuery});
        // Awaiting both promises to resolve and destructuring into 2 variables.
        const [tags, stores] = await Promise.all([tagsPromise, storesPromise]);
        console.log(tags);
        console.log(stores);

        res.render('tags', {tags, tag, title: 'Tags', stores});
    }
    async searchStores(req,res) {
        const stores = await Store
        // First find stores that match
        .find({
            $text: {
                $search: req.query.q
            }
        }, {
            score: { $meta: 'textScore'}
        })
        // Sort them by textScore
        .sort({
            score: { $meta: 'textScore'}
        })
        // Limit to only 5 results
        .limit(5);
        res.json(stores);
        
    }
    async mapStores(req, res) {
        const coordinates = [req.query.lng, req.query.lat].map(parseFloat);
        const q = {
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates
                    },
                    $maxDistance: 10000
                }
            }
        }
        const stores = await Store.find(q).select('slug name description location').limit(10);
        res.json(stores);
    }
    async deleteAll(req,res){
        await Store.deleteAll();
    }
    
}

module.exports = new storeController;