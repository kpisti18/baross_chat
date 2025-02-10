const express = require('express');
const { registerOrLogin } = require('../controllers/authControllers');

const router = express.Router();

router.post('/registerOrLogin', registerOrLogin);

module.exports = router;