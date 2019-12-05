const BasicDAO = require('../../crud/basicDAO');

class VehicleDAO extends BasicDAO {

    constructor(props) {
        super('veiculo');
    }
}

module.exports = VehicleDAO;