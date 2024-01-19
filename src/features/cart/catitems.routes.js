import express from 'express'
import CartItemsController from './cartitems.controller.js';


//intialize express routers

const cartRouter = express.Router();

const cartItemController = new CartItemsController();

cartRouter.post('/',(req,res)=>{cartItemController.add(req,res)});
cartRouter.get('/',(req,res)=>{cartItemController.get(req,res)});
cartRouter.delete('/:id',(req,res)=>{cartItemController.delete(req,res)});


export default cartRouter;