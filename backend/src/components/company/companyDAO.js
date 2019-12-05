const BasicDAO = require('../../crud/basicDAO');

class CompanyDAO extends BasicDAO {

    constructor(props) {
        super('empresa');
    }
}

module.exports = CompanyDAO;