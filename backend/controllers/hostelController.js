const { userInfo } = require('os');
const Hostel = require('../models/hostelModel.js');
const User = require('../models/userModel.js');
const ErrorResponse =  require('../utils/errorResponse');
const mongoose = require('mongoose');

exports.showHostels = async (req,res,next) =>{
    //enable pagination
 
    const pageSize = 10;
    const page = Number(req.query.pageNumber)||1;
    const count = await Hostel.find({}).estimatedDocumentCount();
 
     try{
         const hostels=await Hostel.find().sort({ createdAt: -1 }).select('-password')
         .skip(pageSize * (page-1))
         .limit(pageSize)
         
         res.status(200).json({
             success:true,
             hostels,
             page,
             pages: Math.ceil(count/pageSize),
             count
         });
         next();
 
     }
     catch(error){
         return next(error);
     }
 }

 exports.createHostel = async(req,res,next)=>{
    try{
        const number=req.body.number;
        const hostel1=await Hostel.findOne({number});
        if(hostel1){
            return ErrorResponse("hostel already exists",404);
        }
        const hostel=await Hostel.create(req.body);
        res.status(201).json({
            success:true,
            hostel
        })
        next();
    }
    catch(error){
        return next(error);
    }
}

exports.updateHostel = async(req,res,next)=>{
    try{
        const hostel=await Hostel.findByIdAndUpdate(req.params.hostel_id,req.body,{new:true});
        res.status(201).json({
            success:true,
            hostel
        })
        next();
    }
    catch(error){
        return next(error);
    }
}

exports.insertChat = async(req,res,next)=>{
    try{
        const user = await User.findById(req.user.id).select('-password');
        console.log(user);
        //const hostel = await Hostel.findOne({ user: user });
        console.log("this is first log"+user.Hostel);
        const hostel=await Hostel.findById(user.Hostel);
        const chat=req.body.chat;
        console.log("this is hostel"+hostel);
        console.log(chat);
        if (!hostel) {
            return res.status(404).json({ success: false, message: 'Hostel not found for the specified user' });
        }

        hostel.chats.push(chat);
        await hostel.save();

        res.status(201).json({
            success:true,
            hostel
        })
        next();
    }
    catch(error){
        console.log(error);
        return next(error);
    }   
}

exports.allChats = async(req,res,next)=>{
    try{
        const user = await User.findById(req.user.id).select('-password');
        const hostel = await Hostel.findById(user.Hostel);
        
        if (!hostel) {
            return res.status(404).json({ success: false, message: 'Hostel not found for the specified user' });
        }

        res.status(201).json({
            success:true,
            hostel
        })
        next();
    }
    catch(error){
        return next(error);
    }   
}