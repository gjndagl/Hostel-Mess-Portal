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
        });
        next();
    }catch(error){
        console.log(error);
        return next(error);
    }
}

exports.deleteMenu = async (req, res, next) => {
    try {
        const hostelId = req.params.hostelId;
        const dayId=req.params.dayId-1;
        console.log(dayId);
        // Find the hostel by ID
        //dayId--;
        const hostel = await Hostel.findById(hostelId);
        console.log(hostel);
        if (!hostel) {
            return next(new ErrorResponse("Hostel not found", 404));
        }

        // Find the index of the day in the daysOfWeek array
       // const day=daysOfWeek[dayId];
       
        const index = dayId;
        if (index === -1) {
            return next(new ErrorResponse("Invalid day", 400));
        }

        // Remove the meal for the specified day
        const menuId=hostel.menu[index];
        hostel.menu[index] = null;
        await hostel.save();

        const menu = await Menu.findByIdAndDelete(menuId);

        res.status(200).json({
            success: true,
            message: 'Meal successfully',
            hostel
        });
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};



