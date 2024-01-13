import express from 'express'
import CartItemsController from './cartitems.controller.js';


//intialize express routers

const cartRouter = express.Router();

const cartItemController = new CartItemsController();

cartRouter.post('/',cartItemController.add);
cartRouter.get('/',cartItemController.get);
cartRouter.delete('/:id',cartItemController.delete);


export default cartRouter;