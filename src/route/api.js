const express = require('express');
const router = express.Router();
const {userRegistration,tokenVerify, userLogin, deleteUserAccount, UserLogout} = require('../controller/userController/usersController');
const { articaltCreated, getAllArtical, updateArtical, deleteArtical } = require('../controller/articalController/articalController');
const { categoryCreated, getAllCategory, updateCategory, deleteCategory } = require('../controller/categoryController/categorysController');
const { profileCreated, getProfile, deleteProfile } = require('../controller/userProfileController/profileController');
const UserValidationCheck = require('../mildilware/UserValidationCheck')

// =========== User Api endpoint ==============
router.post('/registration',userRegistration)
router.get("/tokenverify/:id", tokenVerify);
router.post("/login", userLogin);
router.post("/logout", UserLogout);
router.post("/userDelete", UserValidationCheck,deleteUserAccount);


// =========== UserProfile Api endpoint ==============
router.post('/profile',UserValidationCheck,profileCreated)
router.get("/profileGet", UserValidationCheck,getProfile);
router.post("/deleteProfile", deleteProfile);


// =========== Artical Api endpoint ==============
router.post('/createArtical',articaltCreated)
router.get("/allArtical/:pageNo/:perPage", getAllArtical);
router.post("/updateArtical/:id", updateArtical);
router.post("/deleteArtical", deleteArtical);


// =========== Category Api endpoint ==============
router.post('/createCategory',categoryCreated)
router.get("/allCategory",getAllCategory);
router.post("/updateCategory/:id",updateCategory);
router.post("/deleteCategory",deleteCategory);


module.exports = router