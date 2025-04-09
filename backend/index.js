const express = require("express");
const mongoose = require("mongoose");
const categoryRouter = require("./routers/categoryrouter");
const colorRouter = require("./routers/colorRouter");
const productRouter = require("./routers/product.router");
const AdminRouter = require("./routers/adminrouter");
const cors = require('cors');
const adminRouter = require("./routers/adminrouter");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const jwt = require("jsonwebtoken");




const app = express();
app.use(cookieParser());
app.use(express.static("./public"));
app.use(express.json());
app.use(cors({origin:'http://localhost:3000',credentials:true}));

app.use("/category",categoryRouter);
app.use("/color",colorRouter);
app.use("/product",productRouter);  
app.use("/admin",adminRouter);
app.get("/get-cookie",
    (req,res)=>
    {
return res.json({...req.cookies})
    }
)

mongoose.connect("mongodb://localhost:27017/",{dbName:"wsjp-69"})
.then(
    ()=>
    {
        app.listen(5000,()=>
            {
                console.log("server is running on port 5000");
            })
    }
).catch(
    ()=>
    {
        console.log("unable to connect to the database");
    }
)




