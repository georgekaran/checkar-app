const dao = require('../../database/database');
const BasicDAO = require('../../database/basicDAO');

class UserDAO extends BasicDAO {

    constructor(props) {
        super('usuario');
    }
}

module.exports = UserDAO;