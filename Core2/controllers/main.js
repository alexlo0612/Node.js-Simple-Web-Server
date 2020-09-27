// @desc The main route and the home page of the app
// @route GET /
// @access Public
const mapQuery = (req, res) => {
    res.render('index', {
        error: null,
        Latitude: 'Latitude: ',
        Longitude: 'Longitude: ',
        Weather: 'Weather: ',
        Temperature: 'Temperature: ',
        place_id: 'ChIJrUldGqrWaDQR2vYXX6n7SBM',
    });
};

// Export the module
module.exports = { mapQuery, };