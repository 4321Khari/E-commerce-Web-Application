import OrderRepository from "./order.repository.js";


export default class OrderController{
    constructor(){
        this.orderRepository = new OrderRepository();

    }

    async placeOrder(req,res,next){
        try{

            const userID =req.userID;

             await this.orderRepository.placeOrder(userID);
             res.send("order has been created")


        }catch(err){
            console.log(err)
            res.send("error in creating order");

        }
    }
}