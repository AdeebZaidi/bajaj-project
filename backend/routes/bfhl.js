const express = require('express');
const router = express.Router();
const bfhlController = require('../controllers/bfhlController');
const { handlePostRequest, handleGetRequest } = require('../controllers/bfhlController');

// POST route
router.post('/', handlePostRequest);

// GET route
router.get('/', handleGetRequest);

module.exports = router;
