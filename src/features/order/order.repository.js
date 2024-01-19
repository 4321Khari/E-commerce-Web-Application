import { ObjectId, Timestamp } from "mongodb";
import { getClient, getDB } from "../../config/mongodb.js";
import OrderModel from "./order.model.js";

export default class OrderRepository{

    constructor(){
        this.collection = "orders"
    }

    async placeOrder (userID){
        const client = getClient();
        const session = client.startSession()
 
        try{     
        const db = getDB()
        session.startTransaction();

        //1 get the cart item and calculate the total
       const items =  await this.getTotalAmount(userID, session);
        
        const finalTotalAmount =  items.reduce((acc,item)=>acc+item.totalAmount,0)
        
        //2 create an order record
        const newOrder = new OrderModel(new ObjectId(userID),finalTotalAmount,new Date());
       await db.collection(this.collection).inertOne(newOrder,session)

        //3. Reduce the stock
        for(let item of items){
            await db.collection("products").updateOne(
                {_id:item.productID},
                {$inc:{stock: -item.quantity}},
                {session}
            )

        }
     
        //4.Clear the cart item
        await db.collection("cartitems").deleteMany({
            userID: new ObjectId(userID)
        },  {session})
        session.commitTransaction();
        session.endSession()
        return;
    }catch(err){
        console.log(err);
        await session.abortTransaction()
        session.endSession()
        console.log("there is an error while place order");
    }
}
    async getTotalAmount(userID,session){
        

            const db = getDB();
           const items = await db.collection("cartitems").aggregate([
                //1.get the cart item for user
                {
                    $match:{userID: new ObjectId(userID)} 
                 },
                 //2. get the products from the products collection based on the product id in cart item collection
                 {
                    $lookup:{
                        from:"products",
                        localField:"productID",
                        foreignField:"_id",
                        as:"productInfo"

                    }
                 },
                 //3
                 {
                    $unwind:"$productInfo"

                 },
                 //4. calculate the total amount
                 {
                    $addFields:{
                      
                     "totalAmount":{
                            $multiply:["$productInfo.price","$quantity"]
                         },
                        
                    }
                 }
              
            ],{session}).toArray();
            return items;
         
    }
}