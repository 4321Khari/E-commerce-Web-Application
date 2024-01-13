import winston from "winston";

import fs from "fs";

const fsPromise = fs.promises;

// async function log(logData){
//     if(!req.url.includes('signin')){
//     try{
//         logData = `\n ${new Date().toString() } - ${logData}`;
// ``
//         await fsPromise.appendFile("log.txt",logData);
      
//     }catch(err){
//         console.log(err);

//     }
// }
// }

const logger =winston.createLogger({
    level:'info',
    format:winston.format.json(),
    defaultMeta: { service: 'user-request logging' },
    transports:[
        new winston.transports.File({filename:'log.txt'})
    ]
})

const loggerMiddlware = async (req,res,next)=> {
    //middleware to log request body
    const logData = `${req.url} - ${JSON.stringify(req.body)}`
  logger.info(logData);
   next();
   
   
};

export default loggerMiddlware;
