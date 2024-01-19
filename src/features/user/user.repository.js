import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import ApplicationError from "../../errorhandler/applicationError.js";

//creating model from schema
const UserModel = mongoose.model('user',userSchema);


export default class UserRepository{

    async resetPassword(userID,hashPassword){
        try{
            console.log(userID);
            let user =await UserModel.findById(userID);
            console.log(user);
            user.password = hashPassword;
            user.save()

        }catch(err){
            console.log(err);
            throw new ApplicationError("something is wrong while signup of user ",503);
    

        }
    }


    async signUp(user){
      try{
        const newUser = new UserModel(user)
        await newUser.save();

      }catch(err){
         console.log(err);
        throw new ApplicationError("something is wrong while signup of user ",503);

      }

    }

    async findByEmail(email){
        try{
           return await UserModel.findOne({email})

          }catch(err){ console.log(err);
            throw new ApplicationError("something is wrong while signup of user ",503);
    
          }

    }
}