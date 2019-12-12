const Security = require('../auth/security');
const BasicService = require('../../crud/baseService');
const UserDAO = require('./userDAO');

class UserService extends BasicService {

    constructor(props){
        super(UserDAO)
    };

    beforePersist(object) {
        let user = object;
        if(!!object.senha) {
            user.senha = Security.encrypt(object.senha);
        }
        return super.beforePersist(user);
    }

    fields() {
        return ['id', 'nome', 'email', 'empresa_id', 'tipo_usuario_id'];
    }
}

module.exports = UserService;
