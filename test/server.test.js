// const App = require('../client/src/components/App.jsx');
const supertest = require('supertest');
const axios = require('axios');
const app = require('../server/index');

// test('fake-test', () => {
//   render(<App />);
//   const overview = screen.getByTestId('overview');
//   expect(overview).toBeInTheDocument();
//   expect(overview).toHaveTextContent('Hello World');
// })

test("GET /api/products", async () => {
  await supertest(app).get('/api/products')
    .expect(200)
    .then((response) => {
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toEqual(5);
    });
});

test('get all products', () => {
  expect.assertions(1);
  return axios.get('http://localhost:3000/api/products')
    .then((result) => {
      expect(Array.isArray(result.data)).toBeTruthy();
    });
});
