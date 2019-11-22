const express = require('express');
const router = express.Router();
const itemTypeAPI = require('./type/itemTypeAPI');

router.get('/', function(req, res, next) {
    res.status(200).send({message: "Item API"});
});

router.use('/type', itemTypeAPI);

module.exports = router;