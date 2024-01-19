import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import ApplicationError from "../../errorhandler/applicationError.js";

export default class CartItemsRepositroy{

    constructor(){
        this.collection = "cartitems";
    }


  async add(productID,userID,quantity){
     try{

         const db = getDB();
         const collection = db.collection(this.collection);

        await collection.updateOne({productID:new ObjectId(productID),userID:new ObjectId(userID)},
         {
            $inc:{
            quantity: quantity 
         }},
         {upsert: true})

        }  catch(err){
            console.log(err);
          throw new ApplicationError("something is wrong while adding  cartItems",503);
      
        }    

    

    }

    async get(userID){
        try{
              //1. get the DB
        const db = getDB();
        //2. get the collection
        const collection = db.collection(this.collection);
       
       const cartItems=  await collection.find({userID: new ObjectId(userID)}).toArray();
       return cartItems;

        }  catch(err){
            console.log(err);
          throw new ApplicationError("something is wrong while getting cartItems",503);
      
        }    
    }

    async delete(userID,cartItemID){
        try{

            const db = getDB();
            //2. get the collection
            const collection = db.collection(this.collection);

          const result=  await collection.deleteOne({_id:new ObjectId(cartItemID), userID:new ObjectId(userID)});
          return result.deletedCount>0;


        }
        catch(err){
            console.log(err);
          throw new ApplicationError("something is wrong while deleting cartItems",503);
      
        }    
    }
    


}