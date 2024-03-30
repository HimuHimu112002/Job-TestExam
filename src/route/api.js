const express = require('express');
const router = express.Router();
const {userRegistration,tokenVerify, userLogin} = require('../controller/userController/usersController');


// =========== User Api endpoint ==============
router.post('/registration',userRegistration)
router.get("/tokenverify/:id", tokenVerify);
router.post("/login/:email", userLogin);





module.exports = router