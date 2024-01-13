import UserModel from "../features/user/user.model.js";

const basicAuthriozer = (req,res,next)=>{
    //1. check if the authorization header is empty

    
    const authHeader = req.headers['authorization'];

    if(!authHeader){
        return res.status(401).send('no authorization details found');
    }
    console.log(authHeader);
    //2. Extract the credentials
    const base64Credentials = authHeader.replace('Basic','');
    console.log(base64Credentials);

    //3. Decode the credentials
    const decodedCreds = Buffer.from(base64Credentials,'base64').toString('utf8');
    console.log(decodedCreds);
    const creds = decodedCreds.split(':');  //converting string into an array

    const users = UserModel.getAll().find(u=>u.email==creds[0] && u.password==creds[1]);
    if(users){
        next();

    }else{
        return res.status(401).send('incorrect credential')
    }

}

export default basicAuthriozer;
