const {DecodeUserToken} = require("../utility/tokenHelper.js");
const auth = async(req,res,next)=>{

    let token = req.headers['token']
    if(!token){
        if (req.cookies && req.cookies['token']) {
          token = req.cookies['token'];
        }
    }
    let decoded = DecodeUserToken(token)
    if(decoded === null){
        return res.status(401).json({status:"fail", message:"Unauthorized"})
    }else {
        let email = decoded['email'];
        let user_id = decoded['user_id'];
        req.headers.email = email;
        req.headers.user_id = user_id;
        next();
    }
}
module.exports = auth