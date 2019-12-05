const VehicleService = require('./vehicleItemService');
const BasicController = require('../../../crud/baseController');

class VehicleItemController extends BasicController {
    constructor(props) {
        super(VehicleService);
    }
}

module.exports = VehicleItemController;