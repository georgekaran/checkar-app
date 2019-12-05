const BasicDAO = require('../../../crud/basicDAO');

class ItemTypeDAO extends BasicDAO {

    constructor(props) {
        super('tipo_item');
    }
}

module.exports = ItemTypeDAO;