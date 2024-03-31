const mongoose = require('mongoose');
const ArticalShema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    publication_date:{
        type: Date,
        default: Date.now,
    },
    
},
{timestamps: false, versionKey: false}
);
const ProfileModel = mongoose.model('artical', ArticalShema);
module.exports = ProfileModel