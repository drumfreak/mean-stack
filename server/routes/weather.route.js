var express = require('express');
const asyncHandler = require('express-async-handler');
const weatherCtrl = require('../controllers/weather.controller');

var router = express.Router();
module.exports = router;

/* GET weather listing. */


router.get('/:location', (getWeather));

async function getWeather(req, res) {
  //console.log(req.params);
  //console.log('Getting weather from API');
  let weather = await weatherCtrl.getWeather(req.params.location, function(w) {
    //console.log(weather);
    //console.log('Got weather from API');
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(w));
  });
}

module.exports = router;
