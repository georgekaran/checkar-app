const VehicleType = require('./type/vehicleType');
const Company = require('../company/company');

class Vehicle {
    constructor(props){
        this.id = 0;
        this.company = new Company();
        this.type = new VehicleType();
        this.plate = "";
        this.model = "";
        this.brand = "";
        this.year = 0;
        this.chassi = "";
        this.renavam = "";
        this.items = [];
    }
}

module.exports = Vehicle;