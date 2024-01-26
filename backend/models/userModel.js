const mongoose=require('mongoose');
const { ObjectId }= mongoose.Schema;
const bcrypt= require("bcryptjs");
const jwt= require("jsonwebtoken");

const userSchema = new mongoose.Schema({

    name: {
        type : String,
        trim : true,
        maxlength : 32,
        required:[true,'Name is required'],
    },

    email:{
        type:String,
        required:[true,'Email is required'],
        trim:true,
        match:[
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ],
        unique:true,

    },

    password: {
        type: String,
        trim: true,
        required: [true, 'password is required'],
        minlength: [6, 'password must have at least (6) characters'],
    },

    contact: {
          type: String,
          trim:true,
          required: [true, 'Phone Number is required'],
          unique:true
    },

    rollNumber: {
        type: Number,
        required: [true, 'Roll Number is required'],
        unique:true
    },

    roomNo : {
        type: String,
        required: [true, 'Room Number is required'],
        unique:true
    },

    role: {
        type: Number,
        default:0
    },

    Hostel: {
        type: ObjectId,
        ref: "Hostel",
       // required: true
      },

      Balance: {
        type: Float64Array,
        required: true
      }

},{timestamps:true});

module.exports = mongoose.model("User" , userSchema);