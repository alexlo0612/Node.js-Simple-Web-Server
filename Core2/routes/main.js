// Dependencies
const express = require('express');
const router = express.Router();

// Controllers
const { mapQuery, } = require('../controllers/main');

// The home page
router.get('/', mapQuery);

//Export the Module
module.exports = router;
