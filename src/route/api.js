const express = require('express');
const router = express.Router();
const {userRegistration,tokenVerify, userLogin, deleteUserAccount} = require('../controller/userController/usersController');
const { articaltCreated, getAllArtical, updateArtical, deleteArtical } = require('../controller/articalController/articalController');
const { categoryCreated, getAllCategory, updateCategory, deleteCategory } = require('../controller/categoryController/categorysController');
const { profileCreated, getProfile, deleteProfile } = require('../controller/userProfileController/profileController');


// =========== User Api endpoint ==============
router.post('/registration',userRegistration)
router.get("/tokenverify/:id", tokenVerify);
router.post("/login/:email", userLogin);
router.post("/userDelete", deleteUserAccount);


// =========== UserProfile Api endpoint ==============
router.post('/profile',profileCreated)
router.get("/profileGet", getProfile);
router.post("/deleteProfile", deleteProfile);


// =========== Artical Api endpoint ==============
router.post('/createArtical',articaltCreated)
router.get("/allArtical", getAllArtical);
router.post("/updateArtical/:id", updateArtical);
router.post("/deleteArtical", deleteArtical);


// =========== Category Api endpoint ==============
router.post('/createCategory',categoryCreated)
router.get("/allCategory", getAllCategory);
router.post("/updateCategory/:id", updateCategory);
router.post("/deleteCategory", deleteCategory);





module.exports = router