const ItemController = require('./itemController');
const itemTypeAPI = require('./type/itemTypeAPI');
const buildBaseAPI = require('../../crud/baseAPI');

const controller = new ItemController();
const router = buildBaseAPI(controller);

router.use('/:id/type', itemTypeAPI);

module.exports = router;