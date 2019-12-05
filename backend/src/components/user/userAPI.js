const UserController = require('./userController');
const buildBaseAPI = require('../../crud/baseAPI');
const userTypeAPI = require('./type/userTypeAPI');

const controller = new UserController();
const router = buildBaseAPI(controller);

router.get('/create', (req, res) => {
    controller.createHelper(req, res);
});

router.use('/:id/type', userTypeAPI);

module.exports = router;