//import multer
import multer from "multer";

//config the storage with filname and location

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{

        cb(null,"./uploads/");
    },
    filename: (req,file,cb)=>{
       // cb(null,new Date().toISOString() + file.originalname);
        cb(null, Date.now() + file.originalname)
    },  
})

export const upload = multer({storage:storage,});