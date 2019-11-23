const dao = require('../../database/dao');
const BasicDAO = require('../../database/basicDAO');

class AuthDAO extends BasicDAO {

    constructor(props) {
        super('usuario');
    }

    getByEmail(email, cb) {
        const params = {email};
        return dao.selectOne({table: this.table, params}, cb);
    };
}

module.exports = AuthDAO;