const mongoose=require('mongoose');
const { ObjectId }= mongoose.Schema;
  
// Creating Structure of the collection 
const hostelSchema = new mongoose.Schema({ 
  name: { 
    type: String, 
    require: [true,'name is required']
  } 
  , 
  number: { 
    type: Number, 
    default: 0 ,
    require: [true,'number is required']
  } 
}) 

module.exports = mongoose.model("Hostel" , hostelSchema);
