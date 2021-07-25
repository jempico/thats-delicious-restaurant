const express = require('express');
const store = require('../controllers/store');
const router = express.Router();
const storeController = require('../controllers/store');
const { catchErrors} = require('../handlers/errorHandlers');

// Do work here
router.get('/', storeController.homePage);
router.get('/add', storeController.addStore);
router.post('/add', catchErrors(storeController.createStore));

module.exports = router;
