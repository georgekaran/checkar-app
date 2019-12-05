const express = require('express');

function buildBaseAPI(controller) {
    const router = express.Router();
    router.post('/', (req, res) => {
        controller.create(req, res);
    });

    router.get('/', (req, res) => {
        console.log(controller);
        controller.getAll(req, res);
    });

    router.get('/:id', (req, res) => {
        controller.getById(req, res);
    });

    router.put('/:id', (req, res) => {
        controller.update(req, res);
    });

    router.delete('/:id', (req, res) => {
        controller.deleteFn(req, res);
    });

    return router;
}

module.exports = buildBaseAPI;