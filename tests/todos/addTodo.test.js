import '../setup.js';
import { test, describe } from 'node:test';
import assert from 'node:assert';
import { addTodo, randomTodo } from './todoDsl.js';

describe('Add todos', () => {
  test('should create a new todo', async () => {
    const todo = randomTodo();
    const result = await addTodo(todo);
    assert.strictEqual(result.title, todo.title);
    assert.strictEqual(result.completed, false);
    assert(result.created_at);
  });

  test('should throw an error for invalid todo', async () => {
    const todo = {
      title: '',
    };

    await addTodo(todo, ['title is a required field']);
  });
});
