const express = require("express");
const adminRouter = express.Router();
const adminController = require("../controllers/adminController");


adminRouter.post("/login",adminController.loginAdmin);
adminRouter.get("/logout",adminController.logOut);


module.exports=adminRouter;