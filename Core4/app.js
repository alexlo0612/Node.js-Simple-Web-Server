//Require Frameworks
const express = require ('express');
const bodyParser = require ('body-parser');
const ejs = require ('ejs');
const qrcode = require ('qrcode-generator');
const path = require ('path');

//Initialize App
const app = express();

//Setup URL Parser
app.use(bodyParser.urlencoded({
    extended : true
}));

//Setup View Engine and Path
app.use(express.static(path.join(__dirname, 'css')));
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));



//HTTP GET Request Handling / Routing
app.get('/',function(req,res){
    console.log('Visitor Hits');

    res.render('mainpage', {
        title: 'QR Code Main Page',
        img: null,
    });
});

//HTTP POST Request Handling / Routing
app.post('/', function(req,res){
    let qrtext = req.body.Textbox;
    console.log('POST Request Recieved!');
    console.log(qrtext);
    //QR Code Module
    let typeNumber = 0;
    let errorCorrectionLevel = 'H';
    let qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(qrtext);
    qr.make();
    let qrcode_img = qr.createImgTag(10,2);
    //document.getElementById('qr_show').innerHTML = qr.createImgTag(); //-->failed
    //console.log(qr.createImgTag());

    res.render('mainpage', {
        title: 'QR CODE Main Page',
        img: qrcode_img,
    });
});

//Start Server
app.listen(3000 , function(){
    console.log('Server Listening on Port 3000');
});