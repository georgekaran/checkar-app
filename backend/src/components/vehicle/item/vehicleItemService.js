const BasicService = require('../../../crud/baseService');
const VehicleDAO = require('./vehicleItemDAO');

class VehicleItemService extends BasicService {

    constructor(props){
        super(VehicleDAO)
    };
}

module.exports = VehicleItemService;
