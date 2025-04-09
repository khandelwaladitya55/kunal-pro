const mongoose = require("mongoose");


const categorySchema =new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true,
            unique:true
        },
        slug:{
            type:String,
            required:true,
            unique:true,
            trim:true
        },
        status:
        {
            type:Boolean,
            default:true  

        },
        deletedAt:{
type:Date,
default:null    
        }
    },
    {
        timestamps:true
    }
)


const categoryModel = mongoose.model("category",categorySchema);
module.exports = categoryModel;