import UserModel from "../user/user.model.js";

import ApplicationError from "../../errorhandler/applicationError.js";

export default class ProductModel{

    constructor(name,desc,price,imageUrl,categories,sizes,id){
        this._id =id
        this.name = name
        this.desc = desc
        this.price= price 
        this.imageUrl= imageUrl
        this.categories = categories
        this.sizes = sizes
    }

 

       static get(id){
        const product = products.find(i=>i.id==id);
        return product;

       }

   static getAll(){
    return products;
   }

   static filter(minPrice,maxPrice,categories){
    const result = products.filter((product)=>{
     return ( 
      (!minPrice||  product.price>=minPrice)&&
      (!maxPrice || product.price<=maxPrice)&&
      (!categories|| product.categories==categories)
     );
      
    })
    return result;

   }

   static rateProduct (userID,productID,rating){
      //1.validate the user and proudct

      const user = UserModel.getAll().find((u)=>u.id==userID);
      if(!user){
        throw new ApplicationError( "user not found",400);
      }

      const product = products.find((p)=>p.id==productID)
      if(!product){
        throw new ApplicationError( 'Product not found',400);
      }

      //2. check if there are any rating , if not then add rating array
      if(!product.rating){
        product.ratings =[];
        product.ratings.push({userID: userID, rating: rating})
      }else{
        const existingRatingIndex  = product.ratings.findIndex((r)=>r.userID==userID);
      
      if(existingRatingIndex >= 0){
        product.ratings[existingRatingIndex]={
          userID:userID,
          rating:rating
        }
      }
    else{
        //if no exisiting rating

        product.ratings =[];
        product.ratings.push({userID: userID, rating: rating});

      }
    }
      

   }  
  

}


var products = [
    new ProductModel(
      1,
      'Product 1',
      'Description for Product 1',
      19.99,
      'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
      'categories1',
    ),
    new ProductModel(
      2,
      'Product 2',
      'Description for Product 2',
      29.99,
      'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
      'categories2', 
      ['M','XL']
      ),
    new ProductModel(
      3,
      'Product 3',
      'Description for Product 3',
      39.99,
      'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
      'categories3', 
      ['M','XL','S']
      ),
  ]