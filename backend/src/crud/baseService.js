class BaseService {

    constructor(DAO){
        this.DAO = new DAO();
    };

    getById(id, cb) {
        this.DAO.getById({params: {id}, fields: this.fields()}, cb);
    };

    create(values, cb) {
        const object = this.beforePersist(values, 'CREATE');
        return this.DAO.insert({values: object}, cb);
    }

    delete(id, cb) {
        const params = {id};
        return this.DAO.delete({params}, cb);
    }

    update(id, values, cb) {
        const params = {id};
        const object = this.beforePersist(values, 'UPDATE');
        return this.DAO.update({values: object, params}, cb);
    }

    getAll(cb) {
        return this.DAO.getAll({fields: this.fields()}, cb);
    }

    beforePersist(object, type = 'SAVE') {
        object.updated_at = new Date().toLocaleString('pt-BR', { timeZone: 'America/Belem' });
        if(type === 'SAVE') {
            object.created_at = new Date().toLocaleString('pt-BR', { timeZone: 'America/Belem' });
        }
        return object;
    }

    fields() {
        return ["*"];
    }
}

module.exports = BaseService;