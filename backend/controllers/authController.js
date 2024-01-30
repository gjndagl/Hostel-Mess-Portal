const { stringify } = require("querystring");
const User = require("../models/userModel");
const ErrorResponse = require("../utils/errorResponse");

exports.signup = async function(req,res,next){
    const email = req.body.email;
    const userexist = await User.findOne({email});
    if(userexist){
        return next(new ErrorResponse("E-mail already registered",400));
    }
    try{
        const user= await User.create(req.body);
        res.status(201).json({
            success: true,
            user
        })
    }catch(error){
        console.log(error);
        next(error);
    }
}

exports.signin = async function(req,res,next){
    
    try{
        const email = req.body.email;
        const password = req.body.password;
        
        if(!email){
            return next(new ErrorResponse("please add an email",403));
        }
        if(!password){
            return next(new ErrorResponse("please add a password",403));
        }
        const user= await User.findOne({email});
        if(!user){
            return next(new ErrorResponse("Invalid credentials",400));
        }
        const isMatched = await user.comparePassword(password);
        if(!isMatched){
            return next(new ErrorResponse("Invalid credentials",400)); 
        }

        sendTokenResponse(user,200,res);

    }catch(error){
        console.log(error);
        next(error);
    }
}

const sendTokenResponse = async(user,codeStatus,res)=>{
    const token=user.getJwtToken();
    res 
    .status(codeStatus)
    .cookie('token',token, { maxAge: 60*60*1000, httpOnly: true})
    .json({success: true , 
        role: user.role})
} 

exports.logout = (req,res,next) => {
    res.clearCookie('token');     
    res.status(200).json({
        success: true,           
        message: "logged out"
    })
}

exports.userProfile = async (req,res,next) => {
    const user = await User.findById(req.user.id).select('-password');

    res.status(200).json({
        success: true,
        user
    });
}

exports.creditMoney = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        const amount = Number(req.body.amount);

        // Convert user.Balance to a number and then add the amount
        user.Balance = Number(user.Balance) + amount;

        // Save the updated user object
        await user.save();

        res.status(200).json({
            success: true,
            message: "Amount credited",
            user
        });

        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};
