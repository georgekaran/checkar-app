const BasicDAO = require('../../crud/basicDAO');

class ItemDAO extends BasicDAO {
    constructor(props) {
        super('item');
    }
}

module.exports = ItemDAO;