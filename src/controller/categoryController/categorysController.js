const categorysModel = require("../../model/categoryModel/categorysModel.js")

async function  categoryCreated(req,res){
    try{
        const {categoryName,categoryDiscription} = req.body

        if(!categoryName){
            res.send({error: "Please Enter Your Category Name"}) 
        }else if(!categoryDiscription){
            res.send({error: "Please Enter Your Category Discription"})
        }
        else{
            let category = new categorysModel({
                categoryName,
                categoryDiscription,
            })   
            category.save()
            res.send({ status: "success", message:"Created success"}); 
        }
    }catch(e){
        res.send({ status: "fail", error: e.toString()});
    }
    
}

async function getAllCategory(req, res){
    try{

        let data = await categorysModel.find({}).populate("categoryByArtica")
        res.send({ status: "success", message:"success", data:data});

    }catch(e){

        res.send({ status: "fail", error: e.toString()});
    }
    
}

async function updateCategory(req, res){
    try {

        let _id = req.params.id;
        let reqBody = req.body;
        let data = await categorysModel.updateOne({_id:_id},{$set:reqBody})
        res.send({status:"success", message:"update Success", data:data})
    }catch (e) {
        res.send({status:"fail", message:"Something Went Wrong", error:e.toString()})
    }
    
}

async function deleteCategory(req, res){
    try{
        
        let deletData = req.body.id
        let result = await categorysModel.findByIdAndDelete(deletData)
        res.send({status:"success", data:result})
    }catch(e){
        res.send({status:"fail", message:"Something Went Wrong", error:e.toString()})
    }
    
}
module.exports = {categoryCreated,getAllCategory,updateCategory,deleteCategory}