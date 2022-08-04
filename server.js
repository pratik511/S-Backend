const cors = require('cors');
const dotenv = require("dotenv");
const connectDatabase = require("./config/dataBase");
const app = require("./app");



// Handling Uncaught Exception
process.on("uncaughtException",(err) =>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
})

//config

dotenv.config({path:"./config/.env"});

//Connecting to database

connectDatabase()

const server =  app.listen(process.env.PORT ||4000,() =>{
    const port = server.address().port;
    console.log(`Server is working on http://localhost:${port}`);
})
app.use(cors());

//Unhandled Promise Rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandel Promise Rejection`);

    server.close(() =>{
        process.exit(1);
    });
});