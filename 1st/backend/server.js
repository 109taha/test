import express from "express";
import dotenv from "dotenv";
dotenv.config();
// import multer from "multer";
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import cookieParser from "cookie-parser";
const port = process.env.PORT || 5000;
// import ImageModel from './models/image.js';
import userRoutes from './routes/userRoutes.js';
import connectDB from "./config/DB.js";
import cors from "cors";


async function main() {
    try {
        await connectDB()
    } catch (error) {
        throw Error(error)
    }
}

// const Storage= multer.diskStorage({
//     destination: 'uploads',
//     filename: (req, res,cb) =>{
//         cb(null, file.originalname);
//     }
// });
// const upload = multer({
//     storage:Storage
// }).single('testImage')

main().then(() => {
    const app = express();
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }));
    app.use(express.json());

    // app.post('/upload', (req,res) =>{
    //     upload( req, res,(err)=>{
    //         if (err){
    //             console.log(err)
    //         } else{
    //             const newImage = new ImageModel ({
    //                 name: req.body.name,
    //                 image:{
    //                     data:req.file.filename,
    //                     contentType: 'image/png'
    //                 } 
    //             })
    //             newImage.save().then(()=>res.send("successfully Uploaded")).catch(err=>console.log(err));
    //         }
    //     })
    // }) 



    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    
    app.use('/api/user', userRoutes);

    app.get('/', (req, res) => res.send('server is ready'));

    app.use(notFound);
    app.use(errorHandler);

    app.listen(port, () => console.log(`server start on port ${port}`));
}).catch(e => {
    console.log("error ", e);
})