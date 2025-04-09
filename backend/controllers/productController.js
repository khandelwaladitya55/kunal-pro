const productModel = require("../models/product.model");
const categoryModel = require("../models/categorymodel");
const colorModel = require("../models/color.model");
const { generateFileName } = require("../helper");
const fs = require("fs");
// const ProductRouter = require("../routers/product.router");
// const ProductModel = require("../models/product.model");

const productController = {
     deleteImage: async(req,res)=>
        {
        try{
            const {image_index} =req.params;
            const product = await productModel.findOne({_id:req.params.id});
            if(product)
            {
            const otherImagesName = product.other_images;
             fs.unlinkSync("./public/images/product/Other_images/"+otherImagesName[image_index]);  
            otherImagesName.splice(image_index,1);
            product.other_images=otherImagesName;
            await product.save();
            res.send({message:"Image deleted",flag:1,otherImagesName});
            }
else
{
    res.send({flag:0,message:"unable to delte image"});
}
        }catch(error)
        {
            res.send({flag:0, message:"Internal server error"});
        }
        },
    uploadOtherImages: async (req, res) => {
try{
const product = await productModel.findOne({_id:req.params.id});
if(product)
{
const otherImagesName = product.other_images;
const images =req.files.images;
for(img of images)
{
    const name = generateFileName(img.name);
    const destination = "./public/images/product/Other_images";
    await img.mv(destination+"/"+name);
    otherImagesName.push(name);
}
 product.other_images = otherImagesName;
 await product.save();
 res.send({flag:1,message:"Images added",otherImagesName});
}
else
{
    res.send({flag:0,message:"product not found"});
}
}catch(error)
{
res.send({flag:0,message:"Internal server error"});
}
    },
    addProduct: async (req, res) => {
        try {
            const image = req.files.image;
            const { name, slug, original_price, discount_percentage, final_price, category, colors, description } = req.body;
            const destination = './public/images/product/';
            // console.log(image.name);
            const imageName = generateFileName(image.name);
            // console.log(imageName);
            image.mv(
                destination + imageName,
                (err) => {
                    if (err) {
                        res.send({ flag: 0, message: "Image upload failed" });
                    }
                    else {
                        const product = new productModel({
                            name: name,
                            slug, slug,
                            price: original_price,
                            discount: discount_percentage,
                            final_price: final_price,
                            description: description,
                            main_image: imageName,
                            category_id: category,
                            colors: JSON.parse(colors)
                        });
                        product.save().then(() => {
                            res.send({ message: "Product added successfully", flag: 1 });
                            console.log(colors);
                        }).catch(() => {
                            fs.unlinkSync(destination + imageName);
                            res.send({ message: "unable to upload Internal server error", flag: 0 });
                        })
                    }
                }
            )
        } catch (error) {

        }
    },
    async getAllProducts(req, res) {
        try {
            const filterQuery={ deletedAt: null };
            if(req.query.color)
            {
                const colors = req.query.color.split("-");
                const colorIds =[];
                for(color of colors)
                {
                    const colorData = await colorModel.findOne({slug:color});
                    if(colorData)
                    {
                        colorIds.push(colorData._id);
                    }
                }
                filterQuery.colors ={$in:colorIds};
            }
            if(req.query.min && req.query.max)
            {
                filterQuery.final_price={
                    $gte:req.query.min,
                    $lte:req.query.max
                }
            }
            console.log(filterQuery);

            if(req.query.category)
            {
                const category = await categoryModel.findOne({slug:req.query.category});
                if(category)
                {
                    filterQuery.category_id = category._id;
                }
            }
            const sortObj={};
            if(req.query.sortByName)
            {
                sortObj.name=Number(req.query.sortByName); 
            }
            if(req.query.sortByPrice)
            {
                sortObj.final_price=Number(req.query.sortByPrice);
            }
            if(req.query.sortByDate)
            {
                sortObj.createdAt=Number(req.query.sortByDate);
            }
            const limitValue = req.query.sortByLimit ? Number(req.query.sortByLimit) : null;
            console.log(limitValue);

            const products = req.params.id ? await productModel.findById(req.params.id) : await productModel.find(filterQuery).populate(
                ['category_id', 'colors']
            ).sort(sortObj).limit(limitValue);
            res.send({ products, flag: 1 });
        } catch (error) {
            res.send({ message: "Internal server error", flag: 0 });
        }
    },
    async restoreProduct(req, res) {
        try {
            await productModel.updateOne({ _id: req.params.id }, { deletedAt: null }).then(() => {
                res.send({ message: "product restored successfully", flag: 1 });
            }).catch(() => {
                res.send({ message: "unable to restore the product", flag: 0 });
            })
        } catch (error) {
            res.send({ message: "Internal server error", flag: 0 });
        }
    },
    async delProduct(req, res) {
        try {
            productModel.deleteOne({ _id: req.params.id }).then(() => {
                res.send({ message: "product deleted successfully", flag: 1 });
            }).catch(() => {
                res.send({ message: "unable to delete product" });
            })
        } catch (error) {
            res.send({ message: "Internal server error", flag: 0 });
        }
    },
    async getTrashDataProduct(req, res) {
        try {
            const products = await productModel.find({ deletedAt: { $ne: null } });
            res.send({ products, flag: 1 });

        } catch (error) {
            res.send({ message: "Internal server error", flag: 0 });
        }
    },
    async moveToTrash(req, res) {
        try {
            await productModel.updateOne({ _id: req.params.id }, { deletedAt: new Date() }).then(() => {
                res.send({ message: "product move to trash successfully", flag: 1 });
            }).catch(() => {
                res.send({ message: "unable to move to trash product", flag: 0 });
            })
        } catch (error) {
            res.send({ message: "internal server error" });
        }

    },
    async checkProductExists(req, res) {
        try {
            const name = req.params.name;
            const product = await productModel.findOne({ name: name }).countDocuments();
            console.log(product);
            if (product == 1) {
                res.send(
                    {
                        flag: 0,
                        message: "Product name already exist"
                    }
                )
            }

            else {
                res.send({
                    flag: 1,
                    message: "product doesn't exist"
                })
            }
        } catch (error) {
            res.send({ message: `Internal server error ${error.message}`, flag: 0 });
        }
    }
}
module.exports = productController;