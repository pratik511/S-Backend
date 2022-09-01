const app = require("./app");
const connectDatabase = require("./config/dataBase");
const cors = require('cors');
const dotenv = require("dotenv");

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

const server =  app.listen(process.env.PORT || 4000,() =>{
    console.log(`Server is working on http://localhost:${server.address().port}`,app.settings.env);
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