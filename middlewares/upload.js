import multer from 'multer';
import path from 'path';
const storage=multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
     filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const fileFilter=(req,file,cb)=>{
    const ext=path.extname(file.originalname).toLowerCase();
    // if(ext=='.jpg' && ext=='.jpeg' && ext=='.png'){
    //     cb(null, true);
    // }else{
    //     cb(new Error('Only .jpg, .jpeg, and .png files are allowed'), false);
    // }
    cb(null, true);
} 
export const upload=multer({storage,fileFilter});


// For Cloudinary 
const memoryStorage = multer.memoryStorage();
export const uploadMemory = multer({ storage: memoryStorage });
