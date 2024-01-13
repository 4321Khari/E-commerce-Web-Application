//Manage Routes

//import express 
import express from 'express'
import ProductController from './product.controller.js';
import {upload} from '../../middlewares/fileupload.middleware.js'

//intialize express routers

const ProductRouter = express.Router();


const productController = new ProductController();

//All the path to the controllers method
//lcoalhost:3200/api/products
ProductRouter.post('/rate',(req,res)=>{productController.rateProduct(req,res)});

ProductRouter.get('/filter',(req,res)=>{productController.filterProduct(req,res)});

ProductRouter.get('/',(req,res)=>{productController.getAllProducts(req,res)});

ProductRouter.post('/',upload.single('imageUrl'),(req,res)=>{productController.addProduct(req,res)});

ProductRouter.get('/:id',(req,res)=>{productController.getOneProduct(req,res)});


export default ProductRouter;