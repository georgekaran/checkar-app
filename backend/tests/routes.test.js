const request = require('supertest')
const app = require('../src/server');

let server;

beforeEach((done) => {
  server = app.listen(5001, (err) => {
    if (err) return done(err);
    console.log('Server test running');
    done();
  });
});

describe('Sample test endpoints', () => {
  it('should make a get request', async (done) => {
    const res = await request(server)
      .get('/api/test')
    expect(res.statusCode).toEqual(200);
  })
})


afterEach((done) => {
  return server && server.close(done);
});
