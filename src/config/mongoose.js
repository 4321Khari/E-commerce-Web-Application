import mongoose from "mongoose";
import dotenv from "dotenv";
//load all the env variables in application
dotenv.config();


const url = process.env.DB_URL;


export const connectUsingMongoose = async()=>{
   try{
    await mongoose.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true  
    })
        console.log("mongodb connected using mongoose");

   }catch(err){
    console.log(err);
   }
    
}
