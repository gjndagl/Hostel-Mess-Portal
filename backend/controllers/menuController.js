const User = require("../models/userModel");
const Menu=require('../models/menuItemModel');
const Hostel=require('../models/hostelModel');

const ErrorResponse = require("../utils/errorResponse");

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

exports.createAndUpdateMenu=async(req,res,next)=>{
    try{
        const {day,meals}=req.body;
        const hostel=await Hostel.findById(req.params.hostelId);
        if(!hostel)
        {
            return next(new ErrorResponse("Hostel not found", 404));
        }
         const index=daysOfWeek.indexOf(day);

         if (index === -1) {
            return next(new ErrorResponse("Invalid day", 400));
        }
       const menu=await Menu.create(req.body);
       //await menu.save();
       console.log("menu : "+menu);
        
            hostel.menu[index] =menu;
        

        // Save changes to the hostel
        await hostel.save();


        
        res.status(201).json({
            success:true,
            hostel
        })
    }catch(error){
        console.log(error);
        return next(error);
    }
}

exports.deleteMenu = async (req, res, next) => {
    try {
        const { hostelId, day, menuId } = req.params;

        // Find the hostel by ID
        const hostel = await Hostel.findById(hostelId);
        if (!hostel) {
            return next(new ErrorResponse("Hostel not found", 404));
        }

        // Find the index of the day in the daysOfWeek array
        const index = daysOfWeek.indexOf(day);
        if (index === -1) {
            return next(new ErrorResponse("Invalid day", 400));
        }

        // Remove the meal for the specified day
        hostel.menu[index] = { day: null, meals: [] };
        await hostel.save();

        const menu = await Menu.findByIdAndDelete(menuId);

        res.status(200).json({
            success: true,
            message: `Meal for ${day} deleted successfully`,
            hostel
        });
    } catch (error) {
        next(error);
    }
};



