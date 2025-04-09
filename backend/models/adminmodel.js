const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            trim:true
        },
        password:{
            type:String,
            required:true,
        },
       admin_type:{
            type:Number,
            enum:[1,2,3,4,5],
            //1: Super Admin, 2: Sub Admin, 3: Staff
            required:true
        }
    },
    {
        timestamps:true
    }
)
const adminModel = mongoose.model("admin",adminSchema);
module.exports = adminModel;