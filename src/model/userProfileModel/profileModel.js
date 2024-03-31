const mongoose = require("mongoose")
const ProfileShema  = mongoose.Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
    },
    phone:{
        type: String,
        require: true,
    },
    cuntry:{
        type: String,
        require: true,
    },
    city:{
        type: String,
        require: true,
    },

},{versionKey: false})
module.exports = mongoose.model("profile", ProfileShema)