const request = require('../utils/request');

const databaseReq = ({res, props}, cb) => {
    if(props.error) {
        res.status(500).send({...props});
        return;
    }
    cb(props);
};

class BaseController {
    constructor(Service) {
        this.service = new Service();
    }

    create(req, res) {
        const obj = req.body;
        request(() => {
            if(!!obj) {
                this.service.create(obj, (props) =>
                    databaseReq({res, props}, (data) => {
                        res.status(201).send({message: `Create successfully`, data});
                    })
                );
            } else {
                return res.status(400).send({message: 'Not a valid object'});
            }
        }, res);
    }

    getById(req, res) {
        const id = req.params.id;
        request(() => {
            this.service.getById(id, (user) =>
                databaseReq({res, props: user}, (data) => {
                    if(!!user){
                        res.status(200).send(user);
                    } else {
                        res.status(404).send({message: `Object with id ${id} not found`})
                    }
                })
            )
        }, res);
    }

    getAll(req, res) {
        request(() => {
            this.service.getAll((list) =>
                databaseReq({res, props: list}, (data) => {
                    res.status(200).send(list);
                })
            )
        }, res);
    }

    update(req, res) {
        const id = req.params.id;
        const obj = req.body;
        request(() => {
            this.service.update(id, obj, (object) =>
                databaseReq({res, props: object}, (data) => {
                    res.status(200).send({message: "Update successfully", object});
                })
            )
        }, res);
    }

    deleteFn(req, res) {
        const id = req.params.id;
        request(() => {
            this.service.delete(id, (props) =>
                databaseReq({res, props}, (data) => {
                    res.status(200).send({message: "Delete successfully"});
                })
            )
        }, res);
    }
}

module.exports = BaseController;