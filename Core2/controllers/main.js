// Dependencies
const axios = require('axios').default;
const { Client, } = require('@googlemaps/google-maps-services-js');
// Create a new instance of Client
const client = new Client({});


// API URL Function
const { apiUrlFunc, } = require('../config/apiURL');

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

    try {

        // Extract the city out of the request body
        const { city, } = req.body;

        //Call the Google geocoding API to get the coordinates of the input city
        const locationResultGoogle = await client
            .geocode({
                params: {
                    address: city,
                    key: process.env.GOOGE_GEO_CODING_API_KEY,
                },
            });

        // Extract the coordinates from the response
        const { lat, lng, } = locationResultGoogle.data.results[0].geometry.location;

        // Call the OpenWeather OneCall API to get the current weather data
        const weatherResultOpenWeather = await axios
            .get(apiUrlFunc('OneCallOpenWeather', undefined, undefined, lat, lng))
            .catch(err => {
                throw `Error Getting Weather Data: ${err}`;
            });

        // Extract the weather data from the response
        const weatherData = weatherResultOpenWeather.data.current;
        const { temp, humidity, feels_like: realFeel, } = weatherData;
        const { main: currentCondition, description: desc, } = weatherData.weather[0];


        // Object to be rendered
        const renderObj = {
            Latitude: lat,
            Longitude: lng,
            Weather: currentCondition.toLowerCase(),
            Description: desc,
            Temperature: `${temp} C`,
            realFeel: `${realFeel} C`,
            humidity: `${humidity}%`,
        };
        res.render('index', renderObj);

    } catch (error) {
        // Object to be rendered
        const renderObj = {
            error: 'Service Unavailable At the Moment',
        };
        res.render('index', renderObj);
        console.log(error);
    }

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
