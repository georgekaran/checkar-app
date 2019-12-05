const bcrypt = require('bcrypt');
const BasicService = require('../../crud/baseService');
const UserDAO = require('./userDAO');

class UserService extends BasicService {

    constructor(props){
        super(UserDAO)
    };

    static encrypt(string) {
        return bcrypt.hashSync(string, 10);
    }

    beforePersist(object) {
        let user = object;
        if(!!object.senha) {
            user.senha = UserService.encrypt(object.senha);
        }
        return super.beforePersist(user);
    }

    fields() {
        return ['id', 'nome', 'email'];
    }
}

module.exports = UserService;
