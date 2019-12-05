const BasicService = require('../../crud/baseService');
const VehicleDAO = require('./vehicleDAO');

class VehicleService extends BasicService {

    constructor(props){
        super(VehicleDAO)
    };
}

module.exports = VehicleService;
