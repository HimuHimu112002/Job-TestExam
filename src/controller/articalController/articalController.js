const express = require('express')
const articalsModel = require("../../model/articalModel/articalsModel.js")
const categorysModel = require("../../model/categoryModel/categorysModel.js")

async function  articaltCreated(req,res){
    try{

        const {title,content,author,category} = req.body

        if(!title){
            res.send({error: "Please Enter Your Artical title"})

        }else if(!content){
            res.send({error: "Please Enter The Content Discription"})

        }else if(!author){
            res.send({error: "Please Enter The Author Name"})

        }else if(!category){
            res.send({error: "Please Select The Artical Category"})

        }else{

            let artical = new articalsModel({
                title,
                content,
                author,
                category
            })   

            artical.save()
            await categorysModel.findOneAndUpdate({_id: artical.category}, {$push:{categoryByArtica: artical._id}}, {new: true})
            res.send({ status: "success", message:"Created success"}); 
        }
    }catch(e){
        res.send({ status: "fail", error: e.toString()});

    }
    
}

async function getAllArtical(req, res){
    try{

        // Dynamic pagination
        let pageNo = Number(req.params.pageNo)
        let perPage = Number(req.params.perPage)
        let skipRow = (pageNo-1) * perPage

        data = await articalsModel.aggregate([{
            $facet:{
                Rows:[{$skip: skipRow},{$limit:perPage}]

            }

        }])
        res.send({ status: "success", message:"success", data:data});

    }catch(e){
        res.send({ status: "fail", error: e.toString()});

    }
    
}

async function updateArtical(req, res){
    try {

        let _id = req.params.id;
        let reqBody = req.body;
        let data = await articalsModel.updateOne({_id:_id},{$set:reqBody})
        res.send({status:"success", message:"update Success", data:data})

    }catch (e) {
        res.send({status:"fail", message:"Something Went Wrong", error:e.toString()})

    }
    
}

async function deleteArtical(req, res){
    try{
        
        let deletData = req.body.id
        let result = await articalsModel.findByIdAndDelete(deletData)
        res.send({status:"success", data:result})

    }catch(e){
        res.send({status:"fail", message:"Something Went Wrong", error:e.toString()})

    }
    
}
module.exports = {articaltCreated,getAllArtical,updateArtical,deleteArtical}