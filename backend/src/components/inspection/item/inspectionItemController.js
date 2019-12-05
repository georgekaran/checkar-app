const InspectionItemService = require('./inspectionItemService');
const BasicController = require('../../../crud/baseController');

class InspectionItemController extends BasicController {
    constructor(props) {
        super(InspectionItemService);
    }
}

module.exports = InspectionItemController;