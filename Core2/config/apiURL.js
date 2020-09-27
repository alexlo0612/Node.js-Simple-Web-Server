// Global Variables
const apiKeyAccu = process.env.ACCU_WEATHER_API_KEY;
const apiKeyOpenWeather = process.env.OPEN_WEATHER_API_KEY;
// The function to return the correct API URL
const apiUrlFunc = (type, city, locationCode, lat, lng) => {

    // URL for getting the AccuWeather locaiton code
    const locationURLAccu = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKeyAccu}&q=${city}&offset=1`;

    // URL for getting the AccuWeather weather data
    const weatherURLAccu = `http://dataservice.accuweather.com/currentconditions/v1/${locationCode}?apikey=${apiKeyAccu}`;

    // URL for getting the weather data from OpenWeather (in one call)
    const weatherURLOpenWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely,hourly,daily,alert&units=metric&appid=${apiKeyOpenWeather}`;

    // Switch case to determine which URL to return base on the function's input
    switch (type) {
        case 'LocationAccu':
            return locationURLAccu;
        case 'WeatherAccu':
            return weatherURLAccu;
        case 'OneCallOpenWeather':
            return weatherURLOpenWeather;
    }
};

// Export the module
module.exports = { apiUrlFunc, };