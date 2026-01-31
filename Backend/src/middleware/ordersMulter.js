const multer = require("multer")
const path = require("path")
const fs = require("fs")


const foldername=path.join(__dirname,"../../uploads/orders")
console.log(foldername);

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        if(!fs.existsSync(foldername)){
            fs.mkdirSync(foldername,{recursive:true})
        }
        cb(null, foldername);
    },

    filename: (req, file, cb) => {
        const filename=path.join(foldername,file.originalname)
        if(fs.existsSync(filename)){
            cb(new Error("Already file exits"))
        }

        cb(null,file.originalname)
    }
});

const orderUploads = multer({ storage: storage});

module.exports = orderUploads;