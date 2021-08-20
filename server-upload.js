const express = require('express');
//const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const uuid = require('uuid').v4;
const app = express();

/**
mongoose.connect('mongodb://localhost:27017/fileSave', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("MongoDb'ye bağlandı.")
}).catch(err => {
    console.log("MongoDb'ye bağlanmadı.", err)
})
*/

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        // or 
        // uuid, or fieldname
        cb(null, originalname);
    }
})
const upload = multer({ storage }); // or simply { dest: 'uploads/' }
app.use(express.static('public'))

app.post('/upload', upload.array('avatar'), (req, res) => {
    return res.json({ status: 'OK', uploaded: req.files.length });
});

app.listen(3162);
