const ItemTypeController = require('./itemTypeController');
const buildBaseAPI = require('../../../crud/baseAPI');

const controller = new ItemTypeController();
const router = buildBaseAPI(controller);

module.exports = router;