const express = require("express");
const mongoose = require("mongoose");
const categoryRouter = require("./routers/categoryrouter");
const colorRouter = require("./routers/colorRouter");
const productRouter = require("./routers/product.router");
const adminRouter = require("./routers/adminrouter");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.static("./public"));
app.use(express.json());
app.use(cors({
    origin: "*",
    credentials: true
}));

// Routes
app.use("/category", categoryRouter);
app.use("/color", colorRouter);
app.use("/product", productRouter);
app.use("/admin", adminRouter);

// Test Route to get cookies
app.get("/get-cookie", (req, res) => {
    return res.json({ ...req.cookies });
});

// Database connection and server start
mongoose.connect("mongodb://localhost:27017/", {
    dbName: "wsjp-69"
})
.then(() => {
    app.listen(5000, () => {
        console.log("Server is running on port 5000");
    });
})
.catch((err) => {
    console.error("Unable to connect to the database", err);
});
