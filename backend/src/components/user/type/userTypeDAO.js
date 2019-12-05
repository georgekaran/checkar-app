const BasicDAO = require('../../../crud/basicDAO');

class UserTypeDAO extends BasicDAO {

    constructor(props) {
        super('tipo_usuario');
    }
}

module.exports = UserTypeDAO;