var express = require('express');
const multer = require('multer');
const csv = require('csvtojson');
const randomDate = require('randomdate');
const getAge = require('age-by-birthdate');
const frequencyDistribution = require('frequency-distribution');
const app = require('../app');
var result = [];
var fileName;
var result;
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
    const converter = csv()
    .fromFile('uploads/'+fileName)
    .then((json) => {
      for(let i = 0;i < json.length;i++){
        if(json[i].BIRTHDAY==undefined){
          json[i].BIRTHDAY=randomDate(new Date(1960,1,1),new Date(2000,1,1));
          result.push(getAge(json[i].BIRTHDAY));
        }
      }
      res.cookie('result',frequencyDistribution(result,5));
      res.render('upload', { uploadOrNot: 'Uploaded' });
    }) 
  });
  
  module.exports = router;