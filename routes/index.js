var express = require('express');
var router = express.Router();
const locationModel = require("../model/location");

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log("index");
  res.render('index', { title: 'Express' });
});

router.get('/upload', (req, res, next) => {
res.render('upload');
})

router.post('/location', (req,res,next) => {
  const { title, address, lat, lng} = req.body;
  let location = new locationModel();
  location.title = title;
  location.address = address;
  location.lat = lat;
  location.lng = lng;
  location
    .save()
    .then((result) => {
      console.log(result);
      res.json({
        message: "success",
      });
    })
    .catch(error => {
      console.log(error);
      res.json({
        message: "error",
      })
    });
});

router.get("/location", (req,res,next) => {
  locationModel.find({},{_id: 0, __v: 0 }).then((result) => {
    console.log(result);
    res.json({
      message: "success",
      data : result,
    });
  })
  .catch((error)=>{
    res.json({
      message: "error",
    });
  });
});

/*
router.get('/test',(req,res,next)=> {
  console.log("테스트 완료!!");
  res.json({
    message:"response 완료!!",
  });
});

router.post('/test2',(req,res,next)=>{
  const { test, test2 } = req.body;
  console.log(test);
  console.log(test2);
  res.json({
    message: "post 완료!!",
  });
});
*/

module.exports = router;
