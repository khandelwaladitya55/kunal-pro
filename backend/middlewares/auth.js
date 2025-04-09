const jwt = require("jsonwebtoken");

const autherizationMidlleware = (req,res,next)=>
{
        const token = req.headers['authorization'];
        if(!token)
        {
            return res.send({flag:0,message:'Access denied. No token provided'});
        }
        try
        {
const decoded = jwt.verify(token,process.env.jwt_key);
req.user = decoded;
next();
        }catch(error)
        {
    return  res.send({flag:400,message:"Invalid token"});
        }
};


module.exports = autherizationMidlleware;