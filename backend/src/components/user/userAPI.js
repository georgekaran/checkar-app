const express = require('express');
const router = express.Router();

const UserController = require('./userController');
const buildBaseAPI = require('../../crud/baseAPI');
const userTypeAPI = require('./type/userTypeAPI');

//has to call nested routes before to avoid conflicts
router.use('/type', userTypeAPI);

const controller = new UserController();

router.get('/create', (req, res) => {
    controller.createHelper(req, res);
});

buildBaseAPI(controller, router);

module.exports = router;
