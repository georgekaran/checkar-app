const BasicDAO = require('../../crud/basicDAO');

class UserDAO extends BasicDAO {

    constructor(props) {
        super('usuario');
    }
}

module.exports = UserDAO;