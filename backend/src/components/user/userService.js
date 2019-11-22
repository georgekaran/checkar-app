const bcrypt = require('bcrypt');
const UserDAO = require('./userDAO');

class UserService {

    constructor(props){
        this.userDAO = new UserDAO();
    };

    static encrypt(string) {
        return bcrypt.hashSync(string, 10);
    }

    getById(id, cb) {
        this.userDAO.getById({params: {id}, fields: ['id', 'nome', 'email']}, cb);
    };

    create(values, cb) {
        let user = values;
        user.senha = UserService.encrypt(values.senha);
        return this.userDAO.insert({values: user}, cb);
    }

    delete(id, cb) {
        const params = {id};
        return this.userDAO.delete({params}, cb);
    }

    update(id, values, cb) {
        const params = {id};
        let user = values;
        if(!!values.senha) {
            user.senha = UserService.encrypt(values.senha);
        }
        return this.userDAO.update({values: user, params}, cb);
    }

    getAll(cb) {
        return this.userDAO.getAll({fields: ['id', 'nome', 'email']}, cb);
    }
}

module.exports = UserService;
