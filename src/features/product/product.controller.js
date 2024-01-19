import  ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

export default class ProductController{

    constructor(){
        this.productRepository  = new ProductRepository();
    }

async getAllProducts(req,res){
    try{

      const products = await this.productRepository.getAll(); 
      res.status(200).send(products)
    }   catch(err){
    console.log(err)
    return res.status(200).send("error in getting all product");
   
 }

    }

   async addProduct(req,res){
        try{

            const {name,price,sizes}= req.body;
            const newProduct = new ProductModel(name,null,parseFloat(price),
         req.file.filname,null,sizes.split(','));

                const createdProduct = await this.productRepository.add(newProduct);
                // console.log(createdRecord);
                
                res.status(201).send(createdProduct);
         }
        catch(err){
            console.log(err)
            return res.status(200).send("error in adding product");
           
         }
        
    }

  async  rateProduct(req,res){   
        try{
        const userID =req.userID;
        const productID =req.body.productID;
        const rating =req.body.rating;
        
       //console.log(userID);
       await this.productRepository.rateProduct(userID,productID,rating);
       return res.status(200).send('Rating has been added');
       
    }
       catch(err){
        res.status(400).send(err.message);
       }
       
       



    }

    async getOneProduct(req,res){
 try{
    const id = req.params.id;
    const product = await this.productRepository.get(id); 
    if(!product){
        res.status(404).send('product not found');
    }else{
        return res.status(200).send(product);
    }
   
}   catch(err){
    console.log(err)
    return res.status(200).send("error in getting one product");
   
 }
}
   
   async filterProduct(req,res){
      try{   
        const minPrice =req.query.minPrice;
        const maxPrice =req.query.maxPrice;
        const categories =req.query.categories;
       // console.log(req.query);
       const result= await this.productRepository.filter(minPrice,maxPrice,categories)
       res.status(200).send(result)
      } catch(err){
        console.log(err)
        return res.status(200).send("error in filtering product");
       
     }
        


    }
    
}

