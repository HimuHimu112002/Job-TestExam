const profileModel = require("../../model/userProfileModel/profileModel.js")
const phoneVelidation = require("../../utility/phoneNumberValidation.js")

//user profile create and update
// jodi user thake tahole update hobe r jodi user na thake tahole create hobe
async function  profileCreated(req,res){
    try{
        const {name,email,phone,cuntry,city} = req.body
        if(!name){
            res.send({error: "Please Enter Your Profile Name"}) 
        }else if(!email){
            res.send({error: "Please Enter Your Email"})
        }else if(!phone){
            res.send({error: "Please Enter Your Phone Number"})
        }else if(!phoneVelidation(phone)){
            res.send({error: "Please Enter The Bangladeshi Valid Phone Number"})
        }else if(!cuntry){
            res.send({error: "Please Select Your Cuntry Name"})
        }else if(!city){
            res.send({error: "Please Select Your City Name"})
        }else{
            let user_id=req.headers.user_id;
            let reqBody=req.body;
            reqBody.userID=user_id;
            await profileModel.updateOne({userID:user_id},{$set:reqBody},{upsert:true})
            res.send({status:"success", message:"Profile Save Success"})
        }
    }catch(e){
        res.send({ status: "fail", error: e.toString()});
    }
    
}

async function getProfile(req, res){
    try{
        let user_id = req.headers.user_id;
        console.log(user_id)
        let result= await profileModel.find({userID:user_id})
        res.send({status:"success", data:result})
    }catch(e){
        res.send({ status: "fail", error: e.toString()});
    }
    
}

async function deleteProfile(req, res){
    try{
        let deletprofile = req.body.id
        let result = await profileModel.findByIdAndDelete(deletprofile)
        res.send({status:"success", data:result})
    }catch(e){
        res.send({status:"fail", message:"Something Went Wrong", error:e.toString()})
    }
    
}


module.exports = {profileCreated,getProfile,deleteProfile}