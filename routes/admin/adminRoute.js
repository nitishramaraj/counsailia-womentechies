const path = require('path');

const express = require('express');

const adminController = require('./adminController');

const router = express.Router();

router.get('/master', adminController.master);

module.exports = router;