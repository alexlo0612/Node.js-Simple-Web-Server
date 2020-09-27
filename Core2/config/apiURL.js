// Global Variables
const apiKey = process.env.ACCU_WEATHER_API_KEY;

// The function to return the correct API URL
const apiUrlFunc = (type, city, locationCode) => {

    // URL for getting the locaiton code
    const locationURL = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}&offset=1`;

    // URL for getting the weather data
    const weatherURL = `http://dataservice.accuweather.com/currentconditions/v1/${locationCode}?apikey=${apiKey}`;

    // Switch case to determine which URL to return base on the function's input
    switch (type) {
        case 'Location':
            return locationURL;
        case 'Weather':
            return weatherURL;
    }
};

// Export the module
module.exports = { apiUrlFunc, };