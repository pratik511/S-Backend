const express = require('express');
const app = express();
const errorMiddleware = require("./middleware/error");
const cors = require('cors');

app.use(express.json());
app.use(cors());

//Route import
const product = require("./routes/productRoute");

app.use('/api/v1/',product);

//Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
