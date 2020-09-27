// The weather function
const { weatherFunc, } = require('../config/weather');

// @desc The main route and the home page of the app
// @route GET /
// @access Public
const home = (req, res) => {

    // Renders the page
    res.render('index');
};

// @desc Retruns the wather information
// @route POST /
// @access Public
const mapQuery = async (req, res) => {

    // Extract the city out of the request body
    const { city, } = req.body;

    // Weather Function
    const weatherInfo = await weatherFunc(city);

    // Error Checking
    if (weatherInfo === 'No Good') {
        // Object to be rendered
        const renderObj = {
            error: 'Service Unavailable At the Moment',
        };
        res.render('index', renderObj);
        return;
    }

    // Object to be rendered
    const renderObj = {
        Latitude: weatherInfo[0],
        Longitude: weatherInfo[1],
        Weather: weatherInfo[2],
        Description: weatherInfo[3],
        Temperature: weatherInfo[4],
        realFeel: weatherInfo[5],
        humidity: weatherInfo[6],
        place_id: weatherInfo[7],
    };
    res.render('index', renderObj);
};


// Export the module
module.exports = { mapQuery, home, };


// // Make call to the AccuWeather location API
// const locationResultAccu = await axios
//     .get(apiUrlFunc('LocationAccu', city))
//     .catch(err => {
//         throw `Error Getting the Location: ${err}`;
//     });

// // Get the location key from the response
// const locationKey = locationResultAccu.data[0].Key;

// // Get the coordinates from the response
// const coordinates = locationResultAccu.data[0].GeoPosition;

// // Make call to the AccuWeather current condition API
// const weatherResultAccu = await axios
//     .get(apiUrlFunc('WeatherAccu', locationKey))
//     .catch(err => {
//         throw `Error Getting the Location: ${err}`;
//     });
