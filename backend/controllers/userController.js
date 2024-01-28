const User = require('../models/userModel');
const Hostel = require('../models/hostelModel');
const ErrorResponse =  require('../utils/errorResponse');

exports.allUsers = async (req,res,next) =>{
    //enable pagination
 
    const pageSize = 10;
    const page = Number(req.query.pageNumber)||1;
    const count = await User.find({}).estimatedDocumentCount();
 
 
     try{
         const users=await User.find().sort({ createdAt: -1 }).select('-password')
         .skip(pageSize * (page-1))
         .limit(pageSize)
         
         res.status(200).json({
             success:true,
             users,
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

exports.singleUser = async(req,res,next)=>{
    try{
        const user=await User.findById(req.params.id);
        res.status(201).json({
            success:true,
            user
        })
        next();
    }
    catch(error){
        return next(error);
    }
}

exports.editUser = async(req,res,next)=>{
    try{
        const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(201).json({
            success:true,
            user
        })
        next();
    }
    catch(error){
        return next(error);
    }
}

exports.deleteUser = async(req,res,next) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(201).json({
            success: true,
            message : "user deleted"
        })
        next();
    }
    catch(error){
        return next(error);
    }
}

exports.feePayment=async(req,res,next) => {
    try{
        const user=await User.findById(req.params.id);
    
        const hostel=await Hostel.findById(user.Hostel);
      //  console.log(hostel);
        const fee=hostel.monthlyFee;
        const balance=user.Balance;
        if(fee>balance)
        {
            return ErrorResponse("Insufficient Balance",404);
        }
        user.Balance=balance-fee;
        await user.save();
        res.status(201).json({
            success:true,
            user
        });
        next();
    }
    catch(error){
       // console.log(error);
       return next(error);
    }
}