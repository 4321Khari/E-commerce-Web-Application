import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import ApplicationError from "../../errorhandler/applicationError.js";


export default class ProductRepository{

    constructor(){
        this.collection = "products";
    }

   async add(newProduct){
    try{
  
        //1. get the DB
        const db = getDB();
        //2. get the collection
        const collection = db.collection(this.collection);
       
        //3. insert the document
       await collection.insertOne(newProduct);
       return newProduct; 

      }catch(err){
          console.log(err);
          throw new ApplicationError("something is wrong while adding new user ",503);
      }


    }

   async getAll(){
    try{
  
        //1. get the DB
        const db = getDB();
        //2. get the collection
        const collection = db.collection(this.collection);
       
       const products=   await collection.find().toArray();
       return products;
      }catch(err){
          console.log(err);
          throw new ApplicationError("something is wrong while getting thee product ",503);
      }
   }

   async get(id){
      //1. get the DB
      const db = getDB();
      //2. get the collection
      const collection = db.collection(this.collection);
     
    return  await collection.findOne({_id: new ObjectId(id)});

   }    

   async filter(minPrice,maxPrice,categories){
   
   try{

       const db = getDB();
       //2. get the collection
       const collection = db.collection(this.collection);
        let filterExpression = {};
        if(minPrice){
            filterExpression.price = {$gte:parseFloat(minPrice)}
        }
        if(maxPrice){
            filterExpression.price = {...filterExpression.price, $lte:parseFloat(maxPrice)}
        }
        if(categories){
            filterExpression.categories = categories;
        }

       return  collection.find(filterExpression).toArray();



    }catch(err){
        console.log(err);
        throw new ApplicationError("something is wrong while filtering the product ",503);
    }
    
   }

   async rateProduct(userID,productID, rating){
    try{
        const db = getDB();
        //2. get the collection
        const collection = db.collection(this.collection);

        collection.updateOne({_id: new ObjectId(productID)},{
            $push:{ratings:{userID,rating}
        }})
    
    }catch(err){
        console.log(err);
        throw new ApplicationError("something is wrong while rating the product ",503);

    }
   }

}