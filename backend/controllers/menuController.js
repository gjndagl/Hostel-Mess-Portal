const User = require("../models/userModel");
const Menu=require('../models/menuItemModel');
const Hostel=require('../models/hostelModel');

const ErrorResponse = require("../utils/errorResponse");

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

exports.createMenu=async(req,res,next)=>{
    try{
        const {day,meals}=req.body;
        const hostel=await Hostel.findById(req.params.id);
        if(!hostel)
        {
            res.status(404).json({
                success:true,
                message:"Hostel not found"
            });
        }


        
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



