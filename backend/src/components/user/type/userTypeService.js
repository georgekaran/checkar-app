const BasicService = require('../../../crud/baseService');
const UserTypeDAO = require('./userTypeDAO');

class UserTypeService extends BasicService {

    constructor(props){
        super(UserTypeDAO)
    };
}

module.exports = UserTypeService;
