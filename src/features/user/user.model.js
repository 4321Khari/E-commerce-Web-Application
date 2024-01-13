import { getDB } from "../../config/mongodb.js";
import ApplicationError from "../../errorhandler/applicationError.js";


export default class  UserModel{
    constructor(name,email,password,type,id){
        this.name = name,
        this.email =email,
        this.password = password,
        this.type = type,
        this._id = id;
    }
    
    static getAll(){
        return users;
    }
}

let users = [
    {
    'id':1,
    'name':"seller user",
    "email":"seller@eco.com",
    'password':'1',
    'type':'seller',
    
},
{
    'id':2,
    'name':"customer user",
    "email":"customer@eco.com",
    'password':'2',
    'type':'customer',
    
}

]