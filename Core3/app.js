//Require Frameworks
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');
//Global Variable
//const apikey = 'haecPfYw9wk6eqUVNGAjumbeIEEFkmIy'
const apikey = 'hoArfRosT1215'

/*
const (var) --> global variable
let --> block variable
*/

//Define & Initialize App
const app = express();

//Set Up URL Parser
app.use(bodyParser.urlencoded({
  extended: true
}));

//Set up View Engine & its Path
app.use(express.static(path.join(__dirname, 'css')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//HTTP Get Request Handling
app.get('/', function(req, res) {
  //res.send('Hello World!')
  console.log('We Got Visit Here!');
  res.render('index', {
    error: null,
    Latitude: null,
    Longitude: null,
    Weather: null,
    Temperature: null
  });
});

//HTTP Post Request Handling
app.post('/', function(req, res) {
  console.log('Someone Just Post a Request!');
  //console.log(req.body);
  //console.log(req.body.city);
  let city = req.body.city;
  console.log(city);
  let url = `http://apidev.accuweather.com/locations/v1/search?q=${city}&apikey=${apikey}`;
  console.log('API URL is: ' + url);

  //Make API Call
  request(url, function(err, response, body) {
    if (err) { //Check Misc. Errors
      res.render('index', {
        error: 'Error!!',
        Latitude: null,
        Longitude: null,
        Weather: null,
        Temperature: null

      });
      console.log('Error!!');
    } else {
      //console.log(body);
      let stage1 = JSON.parse(body); //Parse Json Response
      //console.log(stage1);
      if (stage1[0] == undefined) { //Check Validity
        res.render('index', {
          error: 'The Freaking City You Just Entered Does Not Exist',
          Latitude: null,
          Longitude: null,
          Weather: null,
          Temperature: null

        });
        console.log('The City Does Not Exist');
      } else { //Get Location Key + Longitude & Latitude
        //console.log(stage1[0].Key);
        let locationkey = stage1[0].Key;
        let Latitude = stage1[0].GeoPosition.Latitude;
        let Longitude = stage1[0].GeoPosition.Longitude;
        console.log(stage1[0].GeoPosition.Latitude);
        console.log(stage1[0].GeoPosition.Longitude);

        /*res.render('index', {
          error: null,
          Latitude: 'Latitude: ' + Latitude,
          Longitude: 'Longitude: ' + Longitude,
          Weather: null,
          Temperature: null
        }); */

        let url2 = `http://apidev.accuweather.com/currentconditions/v1/${locationkey}.json?language=en&apikey=${apikey}`;
        request(url2, function(err, response, body) {
          if (err) {
            res.render('index', {
              error: 'Error!!!',
              Latitude: null,
              Longitude: null,
              Weather: null,
              Temperature: null
            });
            console.log('Error!!');
          } else {
            let stage2 = JSON.parse(body);
            let Weather = stage2[0].WeatherText;
            let Temperature = stage2[0].Temperature.Metric.Value;
            console.log(stage2[0].WeatherText);
            console.log(stage2[0].Temperature.Metric.Value);
            res.render('index',{
              error: null,
              Latitude: 'Latitude: ' + Latitude,
              Longitude: 'Longitude: ' + Longitude,
              Weather: 'Condition: ' + Weather,
              Temperature: 'Temperature: ' + Temperature +' Celcius'
            });
            /*console.log(body);
            console.log(stage2);
            let Weather = stage2[0].WeatherText;
            let Temp = stage2[0].Temperature.Metric;
            console.log(Weather + Temp); */

            /*function parsed(body){
              if(body && body.length > 0){
                let condition = body[0];
                let temp = condition.Temperature.Metric;
                console.log(temp); */
                //console.log(body[0]);
                //let Tempp = JSON.parse(stage2[0].Temperature);
                //console.log(Tempp[0]);
            }
        });
        //console.log(stage1[0]);
        //console.log(stage1.Key);
        //console.log(stage1.Version);
      }
    }
  });
});

//Server Starts
app.listen(3000, function() {
  console.log('App is listening on port 3000!');
});
