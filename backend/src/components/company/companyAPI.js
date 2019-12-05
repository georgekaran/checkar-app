const CompanyController = require('./companyController');
const buildBaseAPI = require('../../crud/baseAPI');

const controller = new CompanyController();
const router = buildBaseAPI(controller);

module.exports = router;