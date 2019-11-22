const request = require('supertest');
const server = require('../src/server');

let app;

beforeEach((done) => {
  app = server.listen(5001, (err) => {
    if (err) return done(err);
    console.log('Server test running');
    done();
  });
});

describe('Sample test endpoints', () => {
  it('should make a get request', async (done) => {
      request(app)
      .get('/test')
      .expect(200, done);
  })
});

afterEach((done) => {
  return app && app.close(done);
});
