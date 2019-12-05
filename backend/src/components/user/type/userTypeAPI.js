const UserTypeController = require('./userTypeController');
const buildBaseAPI = require('../../../crud/baseAPI');

const controller = new UserTypeController();
const router = buildBaseAPI(controller);

module.exports = router;