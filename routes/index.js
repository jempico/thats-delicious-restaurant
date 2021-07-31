const express = require('express');
const store = require('../controllers/store');
const router = express.Router();
const storeController = require('../controllers/store');
const { catchErrors} = require('../handlers/errorHandlers');
const uploadFile = require("../middleware/uploadFile");
const userController = require('../controllers/user');
const validateRegister = require("../middleware/validateRegister")
const authController = require('../controllers/auth');

// Do work here
router.get('/', catchErrors(storeController.getStores));
router.get('/stores', catchErrors(storeController.getStores));
router.get('/add', storeController.addStore);
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


module.exports = router;
