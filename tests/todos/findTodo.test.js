import '../setup.js';
import { test, describe } from 'node:test';
import { addTodo, randomTodo, findTodo } from './todoDsl.js';

describe('Find todo', () => {
  test('should return an existing todo', async () => {
    const todo = randomTodo();
    const result = await addTodo(todo);
    await findTodo(result.id);
  });
});
