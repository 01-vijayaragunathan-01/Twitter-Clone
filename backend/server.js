import express from "express"
import dotenv from "dotenv"
import authRoute from "./routes/authRoute.js"
import connectDB from "./db/connectDB.js"
import cookieParser from "cookie-parser"
import userRoute from "./routes/userRoute.js"
import cloudinary from 'cloudinary'
import postRoute from "./routes/postRoute.js"
import notificationRoute from "./routes/notificationRoute.js"
import cors from "cors"
import path from "path"

dotenv.config()
// const express = require("express") "type": "module" -> package.json
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})
const app = express()
const __dirname = path.resolve() ;
const PORT = process.env.PORT

app.use(cors({
    origin : "http://localhost:3000",
    credentials : true
}))
app.use(express.json({
    limit : "5mb"
})) //this is a middleware -> to req.body in controllers 
app.use(cookieParser()) //we can get cookie from client through this
app.use(express.urlencoded({
    extended : true
}))

app.use("/api/auth" , authRoute)
app.use("/api/users" , userRoute)
app.use("/api/posts" , postRoute)
app.use("/api/notifications" , notificationRoute)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")))
    app.use("/*",(req,res) => {
        res.sendFile(path.resolve(__dirname, "frontend","dist","index.html"))
    })
}

app.listen(PORT , () => {
    console.log(`Server is running on the PORT ${PORT}`)
    connectDB();
})