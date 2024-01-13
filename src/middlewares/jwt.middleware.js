import  jwt from "jsonwebtoken";

const jwtAuth = (req,res,next)=>{
//1.Read the token
const token = req.headers['authorization'];

//2.if no token return error message
if(!token){
    return res.status(401).send('unauthorized');
}
//3.check if the token is valid
try{

   const payload= jwt.verify(token,'ftPr2YZ1JTZbcKs0dxP8jbM2IbFRoDZ4')

   req.userID = payload.userID;
   console.log(payload);
   

  // console.log(payload);
}
catch(err){
    //4.else reutrn error
    return res.status(401).send('unauthorized')
}
//5 .token is valid call next middleware

next();

}


export default jwtAuth;