const UserTypeService = require('./userTypeService');
const BasicController = require('../../../crud/baseController');

class UserTypeController extends BasicController {
    constructor(props) {
        super(UserTypeService);
    }
}

module.exports = UserTypeController;