const ItemService = require('./itemService');
const BasicController = require('../../crud/baseController');

class ItemController extends BasicController {
    constructor(props) {
        super(ItemService);
    }
}

module.exports = ItemController;