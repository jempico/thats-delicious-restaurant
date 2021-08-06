const express = require('express');
const store = require('../controllers/store');
const router = express.Router();
const storeController = require('../controllers/store');
const { catchErrors} = require('../handlers/errorHandlers');
const uploadFile = require("../middleware/uploadFile");
const userController = require('../controllers/user');
const validateRegister = require("../middleware/validateRegister")
const authController = require('../controllers/auth');
const confirmPasswords = require("../middleware/confirmPasswords")
const reviewController = require('../controllers/review');

// Do work here
router.get('/', catchErrors(storeController.getStores));
router.get('/stores', catchErrors(storeController.getStores));
router.get('/add', authController.isLoggedIn, storeController.addStore);
router.post('/add', uploadFile, catchErrors(storeController.createStore));
router.get('/stores/:id/edit', catchErrors(storeController.editStore));
router.post('/add/:id', uploadFile, catchErrors(storeController.updateStore));
router.delete('/stores', catchErrors(storeController.deleteAll));
router.get('/store/:slug', catchErrors(storeController.getStorebySlug))
router.get('/tags', catchErrors(storeController.getStoresByTag));
router.get('/tags/:tag', catchErrors(storeController.getStoresByTag));
router.get('/login', userController.loginForm);
router.get('/register', userController.registerForm);
router.post('/register', validateRegister, userController.register, authController.login);
router.get('/logout', authController.logout);
router.post('/login', authController.login);
router.get('/account', authController.isLoggedIn, userController.account);
router.post('/account', catchErrors(userController.updateAccount));
router.post('/login/forgot', catchErrors(authController.forgot));
router.get('/account/reset/:token', catchErrors(authController.reset));
router.post('/account/reset/:token', confirmPasswords, catchErrors(authController.update));
router.get('/map', storeController.mapPage);
router.post('/reviews/:id', authController.isLoggedIn, catchErrors(reviewController.addReview));
router.get('/top', catchErrors(storeController.getTopStores));
/*
API
*/

router.get('/api/search', catchErrors(storeController.searchStores))
router.get('/api/near', catchErrors(storeController.mapStores))

module.exports = router;
