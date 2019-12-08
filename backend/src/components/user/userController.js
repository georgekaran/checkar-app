const UserService = require('./userService');
const BasicController = require('../../crud/baseController');

class UserController extends BasicController {
    constructor(props) {
        super(UserService);
    }

    createHelper(req, res){
        const user = {"empresa_id": 1, "tipo_usuario_id": 1, "nome": "Administrador", "senha": "123", "email": "admin@checkar.com"};
        this.service.create(user, (props) => {
            res.status(201).send({message: `User ${user.nome} has been created!`});
        });
    }
}

module.exports = UserController;