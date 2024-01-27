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
            return next(new ErrorResponse("Hostel not found", 404));
        }
         const index=daysOfWeek.indexOf(day);

         if (index === -1) {
            return next(new ErrorResponse("Invalid day", 400));
        }

         if (!hostel.menu[index]) {
            hostel.menu[index] = {
                day: day,
                meals: meals
            };
        } else {
            hostel.menu[index].day = day;
            hostel.menu[index].meals = meals;
        }

        // Save changes to the hostel
        await hostel.save();


        
        res.status(201).json({
            success:true,
            hostel
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



