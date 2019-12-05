const ItemTypeService = require('./itemTypeService');
const BasicController = require('../../../crud/baseController');

class ItemTypeController extends BasicController {
    constructor(props) {
        super(ItemTypeService);
    }
}

module.exports = ItemTypeController;