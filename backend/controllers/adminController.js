const adminModel = require("../models/adminmodel");
const jwt = require("jsonwebtoken");
const {serialize} = require('cookie');
const adminController ={
  async  logOut(req,res)
    {
res.clearCookie("admin_token",{
    maxAge:new Date(0),
    httpOnly:false,
    sameSite:"lax",
    secure:false
})
res.send({message:"done"});
    },
  async loginAdmin(req,res)
    {
try{
    const {email,password} = req.body;
    const admin = await adminModel.findOne({email});
    if(!admin)
    {
      return  res.send({message:"admin not found",flag:0});
    }
    if(admin.password == password)
    {
        const token = jwt.sign({...admin.toJSON()},process.env.jwt_key,{expiresIn:"24h"});
        res.cookie(
            "admin_token",token,
            {
          httpOnly:false, //not to be access by js
          maxAge:1000*60 *60 *24,   //24 hours
          sameSite:"lax",   
          secure:false
                
            }
        )
        res.send({message:"login successfully",flag:1,admin:
            {
                ...admin.toJSON(),
                password:"",
                token
            }
        });
    }
    else
    {
        res.send({message:"wrong password",flag:0});
    }

}catch(error)
{
    // console.log(error);
    res.send({message:"Internal server error",flag:0});
}
    }

}
module.exports = adminController;