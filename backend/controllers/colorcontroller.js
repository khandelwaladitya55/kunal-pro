const mongoose = require('mongoose');
const colorModel = require('../models/color.model');
const colorcontroller ={
   async readCOlorData(req,res){
    try{
        let colors;
        if(req.params.id)
        {
            colors =await colorModel.findOne({_id:req.params.id});
            res.send({colors,flag:1});
        }else
        {
             colors =await colorModel.find({deletedAt:null}).sort({createdAt:-1});
            res.send({colors,total:colors.length,flag:1});
        }
    
     }catch(error)
     {
    res.send({message:"Internal server error",flag:0});
     }
    },
    async trashData(req,res)
    {
        try{
            const colors = await colorModel.find({ deletedAt: { $ne: null } });
        res.send({colors,flag:1});
         }catch(error)
         {
        res.send({message:"Internal server error",flag:0});
         }
    },
    async createData(req,res)
    {
        try{
const data = req.body;
const colorCounts = await colorModel.findOne({name:data.name}).countDocuments();

if(colorCounts==1)
{
    res.send({message:"color is already exist",flag:0});
}
const colorfjkdsjf= new colorModel({name:data.name,slug:data.slug,colorhex:data.colorhex});
colorfjkdsjf.save().then(()=>
{
    res.send({message:"color created successfully",flag:1});
}).catch((error)=>
{
    res.send(
        {
            
            message:`unable to create color + ${error.message}`,
            flag:0
        }
    )

});


        }catch(error)
        {
            res.send({message:"Internal server error",flag:0});
        }
    },
    async moveToTrash(req,res)
    {
    try {
        const id=req.params.id;
colorModel.updateOne({_id:id},{deletedAt:new Date()}).then(()=>
{
res.send({message:"color moved to trash successfully",flag:1});
}).catch(()=>
{
    res.send({message:"unable to move to trash",flag:0});
})
    } catch (error) {
        res.send({message:"Internal server error",flag:0});
    }
    },
    async Restore(req,res)
    {
        try {
            const id = req.params.id;
            colorModel.updateOne({_id:id},{deletedAt:null}).
            then(()=>
            {
                res.send({message:"color restored successfully",flag:1});
            })
            .catch(()=>
            {
                res.send({message:"unable to restore color",flag:0});
            })
        } catch (error) {
            res.send({message:`Internal server error`,flag:0});

        }
    },
    async deleteFunction(req,res)
    {
        try {
            await colorModel.deleteOne({_id:req.params.id}).then(()=>
            {
                res.send({message:"color deleted successfully",flag:1});
            }).catch(()=>
            {
                res.send({message:"unable to delete the color",flag:0});
            })
            
        } catch (error) {
            res.send({message:"Internal server error",flag:0});
        }
    },
    async chageStatus (req,res){
        try {
            const id=req.body.id;
            const new_status=req.body.new_status;
           await colorModel.updateOne({_id:id},{status:new_status}).then(()=>
            {
                res.send({message:"status changed",flag:1});
            }).catch(()=>
            {
                res.send({message:"unable to status change",flag:0});
    
            })
            
        } catch (error) {
            console.log(error.message);
            res.send({message:"Internal server error",flag:0});
        }
    }
};

module.exports = colorcontroller;