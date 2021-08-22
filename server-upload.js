const express = require('express');
const multer = require('multer');
const path = require('path');
const uuid = require('uuid').v4;
const app = express();
const mongoose = require('mongoose');
const Image = require('./Models/Image');

mongoose.connect('mongodb://localhost:27017/fileSave', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("MongoDb'ye bağlandı.")
}).catch(err => {
    console.log("MongoDb'ye bağlanmadı.", err)
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        //const { originalname } = file;
        // or 
        // uuid, or fieldname
        const ext = path.extname(file.originalname);
        const id = uuid();
        const filePath = `images/${id}${ext}`;
        Image.create({ filePath })
           .then(() => {
               cb(null, filePath);
           });
    }
})
const upload = multer({ storage }); // or simply { dest: 'uploads/' }
app.use(express.static('public'));
app.use(express.static('uploads'));

app.post('/upload', upload.array('avatar'), (req, res) => {
    return res.json({ status: 'OK', uploaded: req.files.length });
});

app.get('/images', (req, res) => {
    Image.find()
      .then((images) => {
        return res.json({ status : 'OK', images })
      });
});

app.listen(3162);
