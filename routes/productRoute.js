const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetail } = require("../controllers/productcontrollers");

const Router = express.Router();


Router.route("/products").get(getAllProducts);
Router.route("/products/new").post(createProduct);
Router.route("/product/:id").put(updateProduct);
Router.route("/product/:id").delete(deleteProduct);
Router.route("/product/:id").get(getProductDetail);


module.exports = Router