const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

// Create Product --- Admin
exports.createProduct =catchAsyncError(async (req,res,next)=>{

    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
});

//Get All Product 
exports.getAllProducts =catchAsyncError( async (req , res) =>{
    const resultPerPage = 5;
    const productCount = await Product.countDocuments();

    const apiFeatures = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
    const product = await apiFeatures.query;
    
    res.status(200).json({
        success:true,
        product,
        productCount
    })
})

//Get Product Details (single)

exports.getProductDetail =catchAsyncError( async (req, res,next) =>{
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found",404))
    }

    res.status(200).json({
        success:true,
        product,
        // productCount,
    });
});

//Update Product  -- Admin
exports.updateProduct =catchAsyncError( async (req,res,next) =>{

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found",404))
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        product,
        productCount,
    })
})

//Delete Product --Admin

exports.deleteProduct =catchAsyncError( async (req, res ,next) =>{
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found",404))
    }

    await product.remove();

    res.status(200).json({
        success:true,
        message:"Product Delete Successfully"
    })
})