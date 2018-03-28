//Require Frameworks
const express = require ('express');
const bodyParser = require ('body-parser');
const path = require ('path');
const request = require ('request');
//Global Variable
//const apikey = 'haecPfYw9wk6eqUVNGAjumbeIEEFkmIy'
const apikey = 'hoArfRosT1215'

/*
const (var) --> global variable
let --> block variable
*/

//Define App
const app = express();

//Set Up URL Parser
app.use(bodyParser.urlencoded({extended: true}));

//Set up View Engine & its Path
app.use(express.static(path.join(__dirname, 'css')));
app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));

//HTTP Get Request Handling
app.get('/',function(req,res){
  //res.send('Hello World!')
  console.log('We Got Visit Here!');
  res.render('index', {error: null});
});

//HTTP Post Request Handling
app.post('/',function(req,res){
  console.log('Someone Just Post a Request!');
  //console.log(req.body);
  //console.log(req.body.city);
  let city = req.body.city;
  console.log(city);
  let url =  `http://apidev.accuweather.com/locations/v1/search?q=${city}&apikey=${apikey}`;
  console.log('API URL is: '+ url);

//Make API Call
request(url, function(err, response, body){
  if(err){                          //Check Misc. Errors
    res.render('index',{error:'The Freak"n City You Just Entered Does Not Exist'});
    console.log('Error!!');
  } else {
    //console.log(body);
    let stage1 = JSON.parse(body); //Parse Json Response
    //console.log(stage1);
    if(stage1[0] == undefined){    //Check Validity
      //res.render('index', {error:'The Freaking City You Just Entered Does Not Exist'});
      console.log('The City Does Not Exist');
    } else {                      //Get Location Key + Longitude & Latitude
      console.log(stage1[0].Key);
      console.log(stage1[0].GeoPosition.Latitude);
      console.log(stage1[0].GeoPosition.Longitude);
      //console.log(stage1[0]);
      //console.log(stage1.Key);
      //console.log(stage1.Version);
    }
  }
});
});

//Server Starts
app.listen(3000,function(){
  console.log('App is listening on port 3000!');
});
