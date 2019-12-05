const InspectionController = require('./inspectionController');
const inspectionItemAPI = require('./item/inspectionItemAPI');
const buildBaseAPI = require('../../crud/baseAPI');

const controller = new InspectionController();
const router = buildBaseAPI(controller);

router.use('/:id/item', inspectionItemAPI);

module.exports = router;