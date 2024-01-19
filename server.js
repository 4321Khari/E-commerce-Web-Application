
import  express from 'express';
import  swagger from "swagger-ui-express";


import  ProductRouter from './src/features/product/product.routes.js';
import bodyParser from 'body-parser';
import userrouter from './src/features/user/user.routes.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import cartRouter from './src/features/cart/catitems.routes.js';
import apiDocs from './swagger.json ' assert {type:'json'};
import loggerMiddlware from './src/middlewares/logger.middleware.js';
import ApplicationError from './src/errorhandler/applicationError.js';
import { connectToMongodb } from './src/config/mongodb.js';
import orderRouter from "./src/features/order/order.routes.js";
import { connectUsingMongoose } from "./src/config/mongoose.js";


const server = express();


// cors policy config

//server.use(cors())

// parse application/json
server.use(bodyParser.json())


//for  all request related to product redirect to product.routes
server.use("/api-docs",swagger.serve,swagger.setup(apiDocs));

server.use(loggerMiddlware);

server.use('/api/orders',jwtAuth,orderRouter);

server.use('/api/cartItems',jwtAuth,cartRouter);

server.use('/api/products',jwtAuth,ProductRouter);

server.use('/api/users',userrouter);

    server.get('/',(req,res)=>{
        res.send('welcome to E-com APIs')

    })

    //Error handler middleware
    server.use((err,req,res,next)=>{
        console.log(err);
        if(err instanceof ApplicationError){
              return res.status(err.code).send(err.message);

        }
        
            //server-error
           res.status(500).send('somethimg went wrong please try later');
     
    });

    //Middleware to handle 404 request i.e req that does not exsist
    server.use((req,res)=>{
        res.status(404).send("API not foundres.send('somethimg is wrong please try later')");
   
    })

    server.listen(3200,()=>{
        console.log("server is running")
      //  connectToMongodb();
      connectUsingMongoose();
    });
   