
import mongoose from "mongoose";

export const productSchema =  new mongoose.Schema({
    name:String,
    desc:String,
    price:Number,
    instock:Number,
    categories:String,
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Review"

        }
    ]


})