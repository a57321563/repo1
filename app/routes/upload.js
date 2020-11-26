var express = require('express');
const multer = require('multer');
const fs = require('fs');
var fileName;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
      fileName = file.originalname;
    }
  })
var upload = multer({storage: storage});
var router = express.Router();

router.post('/', upload.single('avatar'),function(req, res, next) {
    fs.createReadStream('uploads/'+fileName);
    res.send(fileName);
  });
  
  module.exports = router;