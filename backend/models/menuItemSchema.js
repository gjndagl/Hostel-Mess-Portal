const mongoose=require('mongoose');
const { ObjectId }= mongoose.Schema;

const menuItemSchema = new mongoose.Schema({
    day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        required: true
    },
    meals: {
        breakfast: [{ type: String }],
        lunch: [{ type: String }],
        dinner: [{ type: String }]
    },
  },{timestamps:true});

  module.exports=mongoose.model("MenuItem",menuItemSchema);