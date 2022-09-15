const app = require('./app');


const connectDatabase = require("./config/database")
const dotenv = require('dotenv')
const cloudinary = require("cloudinary")

process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down server due to uncaughtException`)
    process.exit(1)
})

const PORT = process.env.PORT || 8100
 

//config
dotenv.config({path:'../back/config/config.env'})



//conneting to database
connectDatabase()

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

if (process.env.NODE_ENV == "production") {
    app.use(express.static("froont/build"));
   
  }
  

const server = app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})


app.get('/',(req,res)=>{
    res.send("HI")
})

//Unhanlded Promise rejection  //error which has occured while i had written mongo instead of mongodb
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down server due to unHandled Promise Rejection`)

    server.close(()=>{
        process.exit(1)
    })
})