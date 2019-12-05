class BaseService {

    constructor(DAO){
        this.DAO = new DAO();
    };

    getById(id, cb) {
        this.DAO.getById({params: {id}, fields: this.fields()}, cb);
    };

    create(values, cb) {
        const object = this.beforePersist(values);
        return this.DAO.insert({values: object}, cb);
    }

    delete(id, cb) {
        const params = {id};
        return this.DAO.delete({params}, cb);
    }

    update(id, values, cb) {
        const params = {id};
        const object = this.beforePersist(values);
        return this.DAO.update({values: object, params}, cb);
    }

    getAll(cb) {
        return this.DAO.getAll({fields: this.fields()}, cb);
    }

    beforePersist(object){
        return object;
    }

    fields(){
        return ["*"];
    }
}

module.exports = BaseService;