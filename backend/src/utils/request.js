function request(fn, res) {
    try {
        fn();
    } catch (error) {
        res.status(500).send({message: 'Critical error', error});
    }
}

module.exports = request;