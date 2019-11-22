const UserService = require('./userService');
const request = require('../../utils/request');

class UserController {
    constructor() {
        this.userService = new UserService();
    }

    // createHelper(req, res){
    //     const user = {"empresa_id": 1, "tipo_usuario_id": 1, "nome": "Guilherme", "senha": "123", "email": "guilherme@getnada.com"};
    //     this.userService.create(user, (props) => {
    //         res.status(201).send({message: `User ${user.nome} has been created!`});
    //     });
    // }

    create(req, res) {
        const user = req.body;
        request(() => {
            if(!!user) {
                this.userService.create(user, (props) => {
                    res.status(201).send({message: `User ${user.name} has been created!`});
                });
            } else {
                return res.status(400).send({message: 'Not a valid user'});
            }
        }, res);
    }

    getById(req, res) {
        request(() => {
            this.userService.getById(id, (user) => {
                if(!!user){
                    res.status(200).send(user);
                } else {
                    res.status(404).send({message: `User with id ${id} not found`})
                }
            })
        }, res);
    }

    getAll(req, res) {
        request(() => {
            this.userService.getAll((userList) => {
                res.status(200).send(userList);
            })
        }, res);
    }

    update(req, res) {
        const id = req.params.id;
        const user = req.body;
        request(() => {
            this.userService.update(id, user, (user) => {
                res.status(200).send({message: "Update successfully", user});
            })
        }, res);
    }

    deleteFn(req, res) {
        const id = req.params.id;
        request(() => {
            this.userService.delete(id, (props) => {
                res.status(200).send({message: "Delete successfully"});
            })
        }, res);
    }
}
module.exports = UserController;