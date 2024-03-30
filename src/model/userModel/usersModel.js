const mongoose = require("mongoose")
const {Schema} = mongoose
const userSchema = new Schema({
    email:{
        type: String,
        unique: true,
        require: true,
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    password:{
        type: String,
        require: true
    },

},{versionKey: false})
module.exports = mongoose.model("User", userSchema)