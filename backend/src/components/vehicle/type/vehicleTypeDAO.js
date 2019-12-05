const BasicDAO = require('../../../crud/basicDAO');

class VehicleTypeDAO extends BasicDAO {

    constructor(props) {
        super('tipo_veiculo');
    }
}

module.exports = VehicleTypeDAO;