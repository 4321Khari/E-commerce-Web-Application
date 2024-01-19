import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name:{type: String,maxlength:[25,"Name can not be more than 25 letter"]},
    email:{type: String,unique: true ,required:true,
        match:[/.+\@.+\../,"please enter a valid email"]
    },
    password:String,
    type:{type:String, enum:['customer','seller']}
})