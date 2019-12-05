const BasicService = require('../../../crud/baseService');
const ItemTypeDAO = require('./itemTypeDAO');

class ItemTypeService extends BasicService {

    constructor(props){
        super(ItemTypeDAO)
    };
}

module.exports = ItemTypeService;
