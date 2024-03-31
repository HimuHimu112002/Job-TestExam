const mongoose = require('mongoose');
const CategoryShema = mongoose.Schema({
    categoryName:{
        type: String,
        required: true,
    },
    categoryDiscription:{
        type: String,
        required: true,
    },
    categoryByArtica:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"artical"
        }
    ], 
     
},
{timestamps: false, versionKey: false} 
);
module.exports = mongoose.model('category', CategoryShema);