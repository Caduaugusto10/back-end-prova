const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController.js');

router.get('/filmes/pdf', reportController.exportFilmesPDF);

router.get('/generos/pdf', reportController.exportGenerosPDF);

module.exports = router;