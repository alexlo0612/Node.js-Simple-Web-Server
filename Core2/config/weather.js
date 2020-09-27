// Dependencies
const axios = require('axios').default;
const { Client, } = require('@googlemaps/google-maps-services-js');
// Create a new instance of Client
const client = new Client({});

// API URL Function
const { apiUrlFunc, } = require('./apiURL');


const weatherFunc = async (place) => {

    try {


        //Call the Google geocoding API to get the coordinates of the input city
        const locationResultGoogle = await client
            .geocode({
                params: {
                    address: place,
                    key: process.env.GOOGE_GEO_CODING_API_KEY,
                },
            });

        // Extract the coordinates from the response
        const { lat, lng, } = locationResultGoogle.data.results[0].geometry.location;

        // Extract the place id from the response
        const { place_id, } = locationResultGoogle.data.results[0];

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


        return [lat, lng, currentCondition.toLowerCase(), desc, temp, realFeel, humidity, place_id];


    } catch (error) {
        console.log(error);
        return 'No Good';
    }
};

// Export the module
module.exports = { weatherFunc, };