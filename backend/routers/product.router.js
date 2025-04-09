const express = require("express");
const productController = require("../controllers/productController");
const ProductRouter = express.Router();
const fileUpload = require('express-fileupload');


ProductRouter.post("/add",fileUpload({
    createParentPath:true
}),productController.addProduct);
ProductRouter.get("/get-data/:id?",productController.getAllProducts);
ProductRouter.get("/check-product-exists/:name",productController.checkProductExists);
ProductRouter.patch("/move-to-trash/:id",productController.moveToTrash);
ProductRouter.get("/get-trash-data",productController.getTrashDataProduct);
ProductRouter.delete("/delete/:id",productController.delProduct);
ProductRouter.patch("/restore/:id",productController.restoreProduct);
ProductRouter.post("/add-other-images/:id",fileUpload({
    createParentPath:true
}),productController.uploadOtherImages);
ProductRouter.delete("/delete-image/:id/:image_index",productController.deleteImage);
// ProductRouter.post("/create",productController.createProduct);
// ProductRouter.put("/update/:id",productController.updateProduct);
// ProductRouter.delete("/delete/:id",productController.deleteProduct);

module.exports = ProductRouter;