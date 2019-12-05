const BasicService = require('../../crud/baseService');
const InspectionDAO = require('./inspectionDAO');

class InspectionService extends BasicService {

    constructor(props){
        super(InspectionDAO)
    };
}

module.exports = InspectionService;
