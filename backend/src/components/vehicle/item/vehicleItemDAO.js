const BasicDAO = require('../../../crud/basicDAO');

class VehicleItemDAO extends BasicDAO {

    constructor(props) {
        super('veiculo');
    }
}

module.exports = VehicleItemDAO;