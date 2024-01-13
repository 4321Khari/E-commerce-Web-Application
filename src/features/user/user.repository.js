import { getDB } from "../../config/mongodb.js";
import ApplicationError from "../../errorhandler/applicationError.js";


class UserRepository{

     async signUp(newUser){
        try{
  
            //1. get the DB
            const db = getDB();
            //2. get the collection
            const collection = db.collection("users");
           
            //3. insert the document
           await collection.insertOne(newUser);
           return newUser; 
  
          }catch(err){
              console.log(err);
              throw new ApplicationError("something is wrong while signup of user ",503);
          }
  
        
  
      }

      async findByEmail(email){
        try{
  
            //1. get the DB
            const db = getDB();
            //2. get the collection
            const collection = db.collection("users");
           
            //3. insert the document
          return  await collection.findOne({email});
          
  
          }catch(err){
              console.log(err);
              throw new ApplicationError("something is wrong while signup of user ",503);
          }
  
        
  
      }

}


export default UserRepository;
