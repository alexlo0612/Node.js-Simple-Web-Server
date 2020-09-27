// Dependencies
const axios = require('axios').default;

// API URL Function
const { apiUrlFunc, } = require('../config/apiURL');

// @desc The main route and the home page of the app
// @route GET /
// @access Public
const home = (req, res) => {

    // Object to be rendered
    const renderObj = {
        error: null,
        Latitude: 'Latitude: ',
        Longitude: 'Longitude: ',
        Weather: 'Weather: ',
        Temperature: 'Temperature: ',
        place_id: null,
    };

    // Renders the page
    res.render('index', renderObj);
};

// @desc Retruns the wather information
// @route POST /
// @access Public
const mapQuery = async (req, res) => {

    try {

        // Extract the city out of the request body
        const { city, } = req.body;

        // Make call to the AccuWeather location API
        const locationResult = await axios
            .get(apiUrlFunc('Location', city))
            .catch(err => {
                throw `Error Getting the Location: ${err}`;
            });

        // Get the location key from the response
        const locationKey = locationResult.data[0].Key;

        // Get the coordinates from the response
        const coordinates = locationResult.data[0].GeoPosition;

        // Make call to the AccuWeather current condition API
        const weatherResult = await axios
            .get(apiUrlFunc('Weather', locationKey))
            .catch(err => {
                throw `Error Getting the Location: ${err}`;
            });

        // Object to be rendered
        const renderObj = {
            error: null,
            Latitude: coordinates[0],
            Longitude: coordinates[1],
            Weather: 'Weather: ',
            Temperature: 'Temperature: ',
            place_id: null,
        };

        // Renders the page
        res.render('index', renderObj);

    } catch (error) {
        // Object to be rendered
        const renderObj = {
            error: 'Service Unavailable At the Moment',
            Latitude: null,
            Longitude: null,
            Weather: null,
            Temperature: null,
            place_id: null,
        };
        res.render('index', renderObj);
        console.log(error);
    }

};


// Export the module
module.exports = { mapQuery, home, };

// const { Client, } = require('@googlemaps/google-maps-services-js');g
// Create a new instance of Client
// const client = new Client({});
// const result = await client.geocode({
//     params: {
//         address: city,
//         key: process.env.GOOGE_GEO_CODING_API_KEY
//     }
// })
// console.log(result.data.results[0])