const express = require('express');
const UserController = require('./userController');
const router = express.Router();

const controller = new UserController();

router.post('/', (req, res) => {
    controller.create(req, res);
});

router.get('/', (req, res) => {
    controller.getAll(req, res);
});

// router.get('/create', (req, res) => {
//     controller.createHelper(req, res);
// });

router.get('/:id', (req, res) => {
    controller.getById(req, res);
});

router.put('/:id', (req, res) => {
    controller.update(req, res);
});

router.delete('/:id', (req, res) => {
    controller.deleteFn(req, res);
});

module.exports = router;