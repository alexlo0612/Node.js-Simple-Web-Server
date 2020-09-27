//Require Dependencies
const mongoose = require('mongoose');

//DB Path
mongoose.connect('mongodb://localhost/user_test');
//Initiate DB Connection
mongoose.connection
    .once('open', () => console.log('Connection Established!'))
    .on('error', (err) => {
        console.warn('Error:', err)
    });

//Block of test that will run before each test
//Clearn DB
beforeEach((done) => { //done --> things are done when I call done (Magic2)
    mongoose.connection.collections.user_cs.drop(() => {
        //Ready to Execute Next Cute (Magic1)
        done(); //call done
    });
});