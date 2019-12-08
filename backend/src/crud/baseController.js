const request = require('../utils/request');

class BaseController {
    constructor(Service) {
        this.service = new Service();
    }

    create(req, res) {
        const obj = req.body;
        request(() => {
            if(!!obj) {
                this.service.create(obj, (props) => {
                    res.status(201).send({message: `Create successfully`});
                });
            } else {
                return res.status(400).send({message: 'Not a valid object'});
            }
        }, res);
    }

    getById(req, res) {
        const id = req.params.id;
        request(() => {
            this.service.getById(id, (user) => {
                if(!!user){
                    res.status(200).send(user);
                } else {
                    res.status(404).send({message: `Object with id ${id} not found`})
                }
            })
        }, res);
    }

    getAll(req, res) {
        request(() => {
            this.service.getAll((list) => {
                res.status(200).send(list);
            })
        }, res);
    }

    update(req, res) {
        const id = req.params.id;
        const obj = req.body;
        request(() => {
            this.service.update(id, obj, (object) => {
                res.status(200).send({message: "Update successfully", object});
            })
        }, res);
    }

    deleteFn(req, res) {
        const id = req.params.id;
        request(() => {
            this.service.delete(id, (props) => {
                res.status(200).send({message: "Delete successfully"});
            })
        }, res);
    }
}

module.exports = BaseController;