const ItemType = require('./type/itemType');

class Item {
    constructor(props){
        this.id = 0;
        this.name = "";
        this.type = new ItemType();
    }
}

module.exports = Item;