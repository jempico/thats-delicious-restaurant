const Store = require('../models/Store');

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
        //TODO: Check if the store exists with the given name.
        const store = await Store.create(req.body)
        console.log(store);
        req.flash('success', `Succesfully created ${store.name}. Care to leave a review?` );
        res.status(200).redirect(`/store/${store.slug}`);
    }
    async getStores(req,res){
        //1. Query the database for a list of all stores
        const stores = await Store.find();
        console.log('This is working');
        res.render('stores', {title: 'Stores', stores})
    }
    async editStore(req,res){
        const store = await Store.findById(req.params.id)
        //2. TODO Confirm they are the owner of the store
        res.render('editStore', {title: 'Edit Store', store})
    }
    async updateStore(req,res){
        //NOT NEEDED: Set the location type to 'Point' regardless of updates?
        const store = await Store.findOneAndUpdate({_id: req.params.id}, req.body, {
            new: true, //return the new store instead of the old one
            runValidators: true //to validate the new data against the model's schema and avoid empty name and description.
        })
        req.flash('success', `Succesfully updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View Store </a>`);
        res.status(200).redirect(`/stores/${store._id}/edit`);
    }
    async deleteAll(req,res){
        await Store.deleteAll();
        console.log('All deleted')
    }
}

module.exports = new storeController;