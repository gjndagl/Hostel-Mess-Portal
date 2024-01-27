const User = require("../models/userModel");
const Menu=require('../models/menuItemModel');
const Hostel=require('../models/hostelModel');

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

exports.deleteMenu=async(req,res,next)=>{
    try{
         const menu=await Menu.findByIdAndDelete(req.params.id);
         res.status(201).json({
            success:true,
            message: "Menu item deleted"

         });
         next();

    }
    catch(error)
    {
        return next(error);
    }
}

