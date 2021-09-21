const supertest = require('supertest');
const app = require('../server/app.js');

describe('int::app', () => {
  let request = null;
  let server = null;

  beforeAll((done) => {
    server = app.listen(done);
    request = supertest.agent(server);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('Gets product information from a specified endpoint', async () => {
    await request.get('/api/products/42368')
      .expect(200)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBeFalsy();
        expect(res.body.id).toBe(42368);
      });
  });

  it('returns a 400 error is endpoint doesn\'t exist', async () => {
    await request.get('/api/products/404')
      .expect(400);
  });

  it('Gets the related', async () => {
  });

  it('Gets the reviews', async () => {
    await request.get('/api/reviews?product_id=42366')
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body.results)).toBeTruthy();
      });
  });

  it('Get the metadata', async () => {
    await request.get('/api/reviews/meta?product_id=42376')
      .expect(200)
      .then((res) => {
        expect(JSON.stringify(Object.keys(res.body))).toBe(JSON.stringify(['product_id', 'ratings', 'recommended', 'characteristics']));
      });
  });

  it('Gets the questions', async () => {
  });
});
