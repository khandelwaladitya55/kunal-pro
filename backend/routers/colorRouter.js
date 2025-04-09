const express = require("express");
const colorRouter = express.Router();
const ColorController = require("../controllers/colorcontroller");
// const { CategoryController } = require("../controllers/categorycontroller");
const colorcontroller = require("../controllers/colorcontroller");
const autherizationMidlleware = require("../middlewares/auth");

colorRouter.get("/get-data/:id?",ColorController.readCOlorData);
colorRouter.post("/create",colorcontroller.createData);
colorRouter.get("/trash-get-data",colorcontroller.trashData);
colorRouter.patch("/move-to-trash/:id",colorcontroller.moveToTrash);
colorRouter.patch("/restore/:id",colorcontroller.Restore);
colorRouter.delete("/delete/:id",colorcontroller.deleteFunction);
colorRouter.patch("/change-status",colorcontroller.chageStatus);

module.exports = colorRouter;

