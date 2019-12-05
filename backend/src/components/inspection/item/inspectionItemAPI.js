const InspectionItemController = require('./inspectionItemController');
const buildBaseAPI = require('../../../crud/baseAPI');

const controller = new InspectionItemController();
const router = buildBaseAPI(controller);

module.exports = router;