const Hostel = require('../models/hostelModel.js');
const ErrorResponse =  require('../utils/errorResponse');

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
        const hostel1=await findOne({number});
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
        const hostel=await Hostel.findByIdAnsUpdate(req.params.id,req.body,{new:true});
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