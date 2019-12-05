const BasicService = require('../../crud/baseService');
const ItemDAO = require('./itemDAO');

class ItemService extends BasicService {

    constructor(props){
        super(ItemDAO)
    };
}

module.exports = ItemService;
