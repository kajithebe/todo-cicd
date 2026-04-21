const request = require('supertest');
const app = require('../app');

describe('Todo API', () => {
  test('GET /api/todos returns todos', async () => {
    const response = await request(app).get('/api/todos');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  test('GET /health returns ok', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.text).toBe('ok');
  });
});
