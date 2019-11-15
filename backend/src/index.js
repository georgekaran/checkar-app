const Config = require('./utils/config');
const server = require('./server');

const port = Config.APP.PORT;
server.listen(port, () => {
    console.info(`Listening on port ${port}...`);
    console.info(`Checkcar Server started!`)
});