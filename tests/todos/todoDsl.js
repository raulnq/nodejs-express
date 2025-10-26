import request from 'supertest';
import app from '../../src/app.js';
import { faker } from '@faker-js/faker';
import assert from 'node:assert';

export const randomTodo = () => {
  return {
    title: faker.lorem.sentence(15),
  };
};

export const addTodo = async (todo, errors) => {
  const response = await request(app).post('/api/todos').send(todo);

  if (errors === undefined) {
    assert.strictEqual(response.status, 201);
    assert(response.body.id);
  } else {
    assert.strictEqual(response.status, 400);
    assert.deepStrictEqual(response.body.detail, errors);
  }

  return response.body;
};

export const findTodo = async (todoId, error) => {
  const response = await request(app).get(`/api/todos/${todoId}`).send();

  if (error === undefined) {
    assert.strictEqual(response.status, 200);
    assert(response.body.id);
  } else {
    assert.strictEqual(response.status, 404);
    assert.strictEqual(response.body.detail, error);
  }

  return response.body;
};

export const checkTodo = async (todoId, error) => {
  const response = await request(app).post(`/api/todos/${todoId}/check`).send();

  if (error === undefined) {
    assert.strictEqual(response.status, 200);
    assert(response.body.id);
  } else {
    assert(
      response.status === 404 || response.status === 400,
      `Expected status 404 or 400, but got ${response.status}`
    );
    assert.strictEqual(response.body.detail, error);
  }

  return response.body;
};

export const uncheckTodo = async (todoId, error) => {
  const response = await request(app)
    .post(`/api/todos/${todoId}/uncheck`)
    .send();

  if (error === undefined) {
    assert.strictEqual(response.status, 200);
    assert(response.body.id);
  } else {
    assert(
      response.status === 404 || response.status === 400,
      `Expected status 404 or 400, but got ${response.status}`
    );
    assert.strictEqual(response.body.detail, error);
  }

  return response.body;
};
