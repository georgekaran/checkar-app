const BasicService = require('../../../crud/baseService');
const InspectionItemDAO = require('./inspectionItemDAO');

class InspectionItemService extends BasicService {

    constructor(props){
        super(InspectionItemDAO)
    };
}

module.exports = InspectionItemService;
