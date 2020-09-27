// Dependencies
const express = require('express');
const router = express.Router();

// Controllers
const { mapQuery, home, } = require('../controllers/main');

// The home page
router.get('/', home);

// The response
router.post('/', mapQuery);

//Export the Module
module.exports = router;
