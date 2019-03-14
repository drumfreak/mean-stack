const fetch = require('node-fetch');

module.exports = {
  getWeather
}

function getWeather(loc, cb) {
  //console.log('Parameters', loc);
  if(!loc) {
    return {};
  }
  //console.log('Fetching weather from api controller');
  //console.log(loc);

  if(isNaN(loc)) {
    // Lookup via location name
    const url = 'https://www.metaweather.com/api/location/search?query=' + loc;
    // console.log(url);
    fetch(url)
      .then(res => res.json())
      .then(function(location) {
        //console.log('Location Lookup:');
        //console.log(location[0].woeid);
        if(location.length > 0) {
          if(location[0].woeid) {
            fetch('https://www.metaweather.com/api/location/' + location[0].woeid + '/')
              .then(res => res.json())
              .then(json => {
                // console.log(json.consolidated_weather);
                return cb(json.consolidated_weather)
              });
          } else {
            return cb({});
          }
        } else {
          return cb({});
        }
      });
  } else {
    // Lookup via Zipcode.
    // console.log("Looking up location via Zipcode: " + req.params.location);
    const urlZipCode = "https://www.zipcodeapi.com/rest/T95ErLqqSUH4QIMTeoiJ6xOAgVOeyiOf2sViYdMnnM8LGKXWxzI9oMFv5kFN7nBu/info.json/" + loc + "/degrees";

    fetch(urlZipCode)
      .then(res => res.json())
      .then(function(location) {
        // console.log(location);
        if(location.lat && location.lng) {
          const urlLatLong = 'https://www.metaweather.com/api/location/search/?lattlong=' + location.lat + ',' + location.lng;
          fetch(urlLatLong)
            .then(res => res.json())
            .then(function(location) {
              //console.log(location);
              if(location.length > 0) {
                if(location[0].woeid) {
                  fetch('https://www.metaweather.com/api/location/' + location[0].woeid + '/')
                    .then(res => res.json())
                    .then(json => {
                      cb(json.consolidated_weather)
                    });
                } else {
                  return cb({});
                }
              } else {
                return cb({});
              }
            });
        } else {
          return cb({});
        }
      });
  }
}
