const request = require('supertest');
const app = require('../server');

describe('Movies API', () => {
  let server;
  beforeAll(() => {
    server  = app.listen(3001);
  });

  afterAll(() => {
    server.close();
  });

  describe('GET Movies', () => {
    it('Should return a 200 response', async (done) => {
      const response = await request(server).get('/api/movies');
      expect(response.status).toBe(200);
      done();
    });
  });
});

// NOTE: test times out due to not having a properly set up test env with a test db for the application to connect to. 
// In a real world application seperate dev and test envs can be acchieved using an ORM that facilitates the use of separate 
// databases with migration scripts to easily set up, seed and tear down the test env at will.
