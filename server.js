const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/dataBase");
const cors = require('cors');



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

const server =  app.listen(process.env.PORT,() =>{
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