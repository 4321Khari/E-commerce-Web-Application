
import CartItemsRepositroy from "./cartitems.repository.js";

export default class CartItemsController{

    constructor(){
        this.cartItemsRepository = new CartItemsRepositroy();
    }

   async add(req,res){
        const {productID,quantity} = req.body;
        const userID = req.userID;

       const result=  await  this.cartItemsRepository.add(productID,userID,quantity);
       console.log("this is the result:",result);

        res.status(201).send("cart updated successfully")

    }

    async get(req,res){
        
        const userID = req.userID;
       const items=  await  this.cartItemsRepository.get(userID);

        return res.status(200).send(items);

    }

   async delete(req,res){
        const userID =req.userID;
        const cartItemID = req.params.id;
        const isDeleted  = await this.cartItemsRepository.delete(cartItemID,userID);
        if(!isDeleted){
            return res.status(404).send("items not found");

        }return res.status(200).send('Item deleted successfuly')
    }
}