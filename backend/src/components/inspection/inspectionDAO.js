const BasicDAO = require('../../crud/basicDAO');

class InspectionDAO extends BasicDAO {

    constructor(props) {
        super('vistoria');
    }
}

module.exports = InspectionDAO;