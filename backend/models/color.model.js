const mongoose = require("mongoose");


const colorSchema =new mongoose.Schema(
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
            trim:true
        },
        colorhex:
        {
            type:String,
            default:true

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


const colorModel = mongoose.model("colorModel",colorSchema);
module.exports = colorModel;