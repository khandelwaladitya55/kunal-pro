const  express = require("express");
const categoryRouter = express.Router();
const {CategoryController} = require("../controllers/categorycontroller");
const autherizationMidlleware = require("../middlewares/auth");

categoryRouter.post("/create",autherizationMidlleware,CategoryController.create);
categoryRouter.get("/get-data/:id?",CategoryController.read);
categoryRouter.get("/trash-get-data",CategoryController.trashGetData);
categoryRouter.delete("/delete/:id",CategoryController.deletefuction);
categoryRouter.patch("/move-to-trash/:id",CategoryController.moveToTrash);
categoryRouter.patch("/change-status",autherizationMidlleware,CategoryController.changeStatus);
categoryRouter.patch("/restore/:id",CategoryController.restoreFuc);
categoryRouter.put("/update/:id",CategoryController.update);
module.exports = categoryRouter;  