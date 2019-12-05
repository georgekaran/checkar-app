class BaseModel {
    constructor() {
        this.id = 0;
        this.created_at = new Date();
        this.updated_at = new Date();
    }
}

module.exports = BaseModel;