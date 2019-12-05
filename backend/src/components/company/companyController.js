const CompanyService = require('./companyService');
const BasicController = require('../../crud/baseController');

class CompanyController extends BasicController {
    constructor(props) {
        super(CompanyService);
    }
}

module.exports = CompanyController;