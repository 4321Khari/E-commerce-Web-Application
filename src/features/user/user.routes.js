import express from 'express'
import UserController from './user.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';


//intialize express routers

const userrouter = express.Router();

const userController = new UserController();

userrouter.post('/signup',(req,res)=>{userController.signup(req,res)});

userrouter.post('/signin',(req,res)=>{userController.signin(req,res)});

userrouter.put("/resetPassword",jwtAuth,(req,res)=>{userController.resetPassword(req,res)})


export default userrouter;