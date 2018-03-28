//Require Frameworks
const express = require ('express');
const bodyParser = require ('body-parser');
const path = require ('path');
//Define app
const app = express();

//HTTP Get Request Handling
app.get('/',function(req,res){
  //res.send('Hello World!')
  console.log('Got Visit Here!');
  res.render('index');
});

//HTTP Post Request Handling
app.post('/',function(req,res){
  console.log('Someon Just Post a Request!');
});


//Set up View Engine & its Path
app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));



//Server Starts
app.listen(3000,function(){
  console.log('App is listening on port 3000!');
});
