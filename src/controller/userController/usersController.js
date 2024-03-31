const bcrypt = require('bcrypt');
const userModel = require("../../model/userModel/usersModel.js");
const EmailSend = require('../../utility/emailSend.js');
const jwt = require("jsonwebtoken");
const emailVelidation = require('../../utility/emailValidation.js');

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

      let FindduplicateEmail = await userModel.find({email: email})

      if(FindduplicateEmail.length > 0){
        return res.send({error: "This email already in used. Try another email"})
      }

      bcrypt.hash(password, 10, async function(err, hash) {
        // Create JWT Token
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
    res.send({status:"fail", message:"Something Went Wrong",e})
  } 
    
}

// User login
let userLogin = async(req, res)=>{
  try{

    const email = req.params.email;
    const {password } = req.body;
    const userEmail = await userModel.findOne({email});

    if (userEmail) {

      if (userEmail.emailVerified) {
        
        bcrypt.compare(password, userEmail.password, function (err, result) {
          if (result) {
            res.send({status:"success", message:"Login successfull"});
          } else {
            res.send({status: "fail", message:"Wrong password"});
          }

        });

      }else {
        res.send({status:"fail", message: "Unauthorized! Verify email address before login",});
      }
    }
  }catch(e){
    res.send({status:"fail", message:"Something Went Wrong",e})
  }
   
}

// Delete User Account
async function deleteUserAccount(req, res){
  try{
    let deletData = req.body.id
    let result = await userModel.findByIdAndDelete(deletData)
    res.send({status:"success", data:result})
  }catch(e){
    res.send({status:"fail", message:"Something Went Wrong", error:e.toString()})
  }
  
}

module.exports = {userRegistration,tokenVerify,userLogin,deleteUserAccount};