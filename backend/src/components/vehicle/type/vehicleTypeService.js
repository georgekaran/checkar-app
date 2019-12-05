const BasicService = require('../../../crud/baseService');
const VehicleTypeDAO = require('./vehicleTypeDAO');

class VehicleTypeService extends BasicService {

    constructor(props){
        super(VehicleTypeDAO)
    };
}

module.exports = VehicleTypeService;
