const Store = require('../models/Store');

class storeController {
    // Homepage
    homePage(req, res) {
        res.render('index')
    }
    addStore(req,res){
        res.render('editStore', { title: 'Add Store'})
    }
    async createStore(req,res){
        const newStore = await Store.create(req.body)
        console.log('Store saved!')
        res.status(200).redirect('/');
    }
}

module.exports = new storeController;