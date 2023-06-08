import multer from "multer";

const upload  = multer({
    dest:'image' ,
    limits:50000,
    preservePath:true,
    filename: 'my-img',
    
}) 

 export default upload;