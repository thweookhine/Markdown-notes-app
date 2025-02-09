const multer = require("multer");
const path = require("path");
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        const notes_dir = path.join(__dirname, '../notes');
        
        // Ensure notes dir exists
        if(!fs.existsSync(notes_dir)){
            // Create notes dir
            fs.mkdirSync(notes_dir);
        }
        cb(null, notes_dir)
    },
    filename: (req,file,cb) => {
        let fileNameWithExt =  file.originalname 
        let fileName = path.parse(fileNameWithExt).name;
        fileName = `${fileName}_${new Date().toISOString()}.md`
        cb(null, fileName)
    }
})

const fileTypeFilter = (req,file,cb) => {
    if(file.mimetype === 'text/markdown' || file.originalname.endsWith('.md')){
        cb(null, true);
    }else{
        cb(new Error("Only markdown (.md) files are allowed."))
    }
}

const upload = multer({storage, fileFilter: fileTypeFilter})

module.exports = upload