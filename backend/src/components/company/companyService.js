const BasicService = require('../../crud/baseService');
const CompanyDAO = require('./companyDAO');

class CompanyService extends BasicService {

    constructor(props){
        super(CompanyDAO)
    };
}

module.exports = CompanyService;
