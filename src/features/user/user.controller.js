import UserModel from "./user.model.js";
import  jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";



export default class UserController{

  constructor(){
    this.userRepository = new UserRepository();


  }

    async resetPassword(req,res){
      const {newPassword} = req.body;
      console.log(newPassword);
      const hashPassword = await bcrypt.hash(newPassword,12,)
      const userID = req.userID;
      try{
        await  this.userRepository.resetPassword(userID,hashPassword);
        res.send("password updated")
      }catch(err){
        console.log(err);
      }

    }

    async signup(req,res){

      const {name,email,password,type} = req.body;
      const hashPassword = await bcrypt.hash(password,12,)
      
       const user = new UserModel(name,email,hashPassword,type);
 
      await this.userRepository.signUp(user);

        res.status(201).send(user)



    }

   async signin(req,res,){
    try{

      const user =  await this.userRepository.findByEmail(req.body.email);
   
      if(!user){
        return res.status(400).send('incorrect credentials');
      }else{
        //1.compare the password and hashedpassword 
        const match = await bcrypt.compare(req.body.password,user.password)
        if(match){

           //1.create token
        const token = jwt.sign({userID: user._id,email:user.email},process.env.JWT_SECRET,{
          expiresIn:'1h',
        })
        
        
        //2, send token
        return res.status(200).send(token);

        }else{
          return res.status(400).send('Password is incorrect');

        }

       
      }
    } catch(err){
      console.log(err)
      return res.status(200).send("error in sigin");
     

    }
    }
}