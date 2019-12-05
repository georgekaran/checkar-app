const VehicleService = require('./vehicleTypeService');
const BasicController = require('../../../crud/baseController');

class VehicleTypeController extends BasicController {
    constructor(props) {
        super(VehicleService);
    }
}

module.exports = VehicleTypeController;