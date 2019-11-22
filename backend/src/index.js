const server = require('./server');
const Config = require('./utils/config');

const port = Config.APP.PORT;
server.listen(port, () => {
    console.info(`Listening on port ${port}...`);
    console.info(`Checkcar Server started!`)
});