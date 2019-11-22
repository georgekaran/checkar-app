const express = require('express');
const AuthController = require('./authController');
const router = express.Router();

router.post('/login', (req, res) => {
    AuthController.login(req, res);
});

router.get('/logout', (req, res) => {
    AuthController.logout(res);
});

module.exports = router;