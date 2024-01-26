const User = require("../models/userModel");
const ErrorResponse = require("../utils/errorResponse");

exports.createMenu=async(req,res,next)=>{
    try{
        const menu=await Menu.create(req.body);
        res.status(201).json({
            success:true,
            menu
        })
    }catch(error){
        return next(error);
    }
}