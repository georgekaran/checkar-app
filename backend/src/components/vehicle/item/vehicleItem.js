const Item = require('../../item/item');
const Vehicle = require('../vehicle');

class VehicleItem {
    constructor(props){
        this.id = 0;
        this.vehicle = new Vehicle();
        this.item = new Item();
        this.order = 0;
    }
}

module.exports = VehicleItem;