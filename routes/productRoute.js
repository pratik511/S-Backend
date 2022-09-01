const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetail, createProductReview, getProductReviews, deleteReviews } = require("../controllers/productcontrollers");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const Router = express.Router();

Router.route("/products").get(getAllProducts);
Router.route("/products/new").post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
Router.route("/product/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
                            .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)
Router.route("/product/:id").get(getProductDetail);
Router.route("/review").put(isAuthenticatedUser,createProductReview);
Router.route("/reviews").get(isAuthenticatedUser,getProductReviews).delete(isAuthenticatedUser,deleteReviews)


module.exports = Router;