import express, { response } from "express"
import fs from "fs"
import { cloudinaryConfig, cloudinaryUploader } from "./config/cloudinary.js"
import upload from "./middlewares/multer.js"
import dotenv from "dotenv"
import cors from "cors"
dotenv.config()

const PORT = 3000
const app = express()

app.use(cors())

cloudinaryConfig()

app.post("/upload", upload.single('image'), async (req, response) => {
    try {
        // console.log(req.file);
        const file = await cloudinaryUploader.upload(req.file.path)

        // save file path into database

        // remove image
        fs.unlink(req.file.path, (error, res) => {
            if(error) {
                return response.status(400).json({
                    message : error.message
                })
            }

            response.status(201).json({
                message : "FILE UPLOADED",
                data : file
            })
        })
    } 
    catch (error) {
        console.log("Error", error);
    }
})

app.listen(PORT, ()=> console.log(`Server Running on https://localhost:${PORT}`))