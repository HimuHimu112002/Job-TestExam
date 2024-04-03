const bcrypt = require('bcrypt');
const userModel = require("../../model/userModel/usersModel.js");
const EmailSend = require('../../utility/emailSend.js');
const jwt = require("jsonwebtoken");
const emailVelidation = require('../../utility/emailValidation.js');
const { EncodeUserToken } = require('../../utility/tokenHelper.js');

let userRegistration =  async (req, res)=>{
  try{

    const {email, password} = req.body

    if(!email){
      res.send({error: "Please Enter Your Email"}) 

    }else if(!emailVelidation(email)){
      res.send({error: "Please Enter The Valid Email"})

    }else if(!password){
      res.send({error: "Please Enter The Password"})

    }
    else {

      let findDuplicateEmail = await userModel.find({email: email})

      if(findDuplicateEmail.length > 0){
        return res.send({error: "This email already in used. Try another email"})
      }

      bcrypt.hash(password, 10, async function(err, hash) {
        // Create JWT Token for verification original email
        let token = jwt.sign(email, process.env.PRIVATE_KEY, { algorithm: "HS384" });

        let user = new userModel({
          email: email,
          password: hash,
        })
        user.save()
        EmailSend(email, token);
        res.send({status:"success", message: "Registration Success", token:token})
      });
    
    }
  }catch(e){
    res.send({status:"fail", message:"Something Went Wrong",e})
  }
    
}

// Decoded and verify token from email
let tokenVerify =  async (req, res)=>{
  try{

    const token = req.params.id;

    jwt.verify(token, process.env.PRIVATE_KEY, async function (err, decoded) {
      if (decoded) {
        await userModel.findOneAndUpdate(
          { email: decoded },
          { emailVerified: true },
          { new: true }
        );
        res.send({ status:"success", message:"verify"});

      } else {
        res.send({ error: "token unverified" });
        
      }
    });

  }catch(e){
    res.send({status:"fail", message:"Something Went Wrong", error:e.toString()})
  } 
    
}

// User login
let userLogin = async(req, res)=>{
  try{

    const {password,email} = req.body;
    
    if(!email){
      res.send({error: "Please Enter Your Email"}) 

    }else if(!emailVelidation(email)){
      res.send({error: "Please Enter Your Valid Email"})

    }else if(!password){
      res.send({error: "Please Enter The Password"})

    }else{

      const userEmail = await userModel.findOne({email});
      const emailExit = await userModel.find({email});

      let user_id= await userModel.find({email:email}).select('_id');
      if(emailExit.length > 0){
        if (userEmail) {
    
          if (userEmail.emailVerified) {

            // User Token Create
            let token = EncodeUserToken(email,user_id[0]['_id'].toString())
            res.cookie('token',token)

            bcrypt.compare(password, userEmail.password, function (err, result) {
              if (result) {
                res.send({status:"success", message:"Login success", token:token});
              } else {
                res.send({status: "fail", message:"Wrong password"});
              }
    
            });
    
          }else {
            res.send({status:"fail", message: "Unauthorized! Verify email address before login",});
          }
        }
      }else{
        res.send({status:"fail", message:"Email is not matching"})
      }
    }
  }catch(e){
    res.send({status:"fail", message:"Something Went Wrong", error:e.toString()})
  }
   
}

// Delete User Account
let deleteUserAccount = async(req, res)=>{
  try{
    
    let user_id = req.headers.user_id;

    const userDelete = await userModel.findOne({_id:user_id});

    if(userDelete){
      await userModel.findByIdAndDelete(userDelete)
      res.send({status:"success"})

    }else{
      res.send({status:"fail", message:"User Not Found"})

    }
  }catch(e){
    res.send({status:"fail", message:"Something Went Wrong", error:e.toString()})
  }
  
}

// Delete User Account
let UserLogout = async(req, res)=>{
  
  try{

    let cookieRemove= {expires:new Date(Date.now()-24*6060*1000), httpOnly:false}
    res.cookie('token',"",cookieRemove)
    res.send({status: "success"})

  }catch(e){
    res.send({status:"fail", message:"Something Went Wrong", error:e.toString()})

  }
  
}

module.exports = {userRegistration,tokenVerify,userLogin,deleteUserAccount,UserLogout};