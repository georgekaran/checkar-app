const InspectionService = require('./inspectionService');
const BasicController = require('../../crud/baseController');

class InspectionController extends BasicController {
    constructor(props) {
        super(InspectionService);
    }
}

module.exports = InspectionController;