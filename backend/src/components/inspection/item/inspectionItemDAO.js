const BasicDAO = require('../../../crud/basicDAO');

class InspectionItemDAO extends BasicDAO {

    constructor(props) {
        super('item_vistoria');
    }
}

module.exports = InspectionItemDAO;