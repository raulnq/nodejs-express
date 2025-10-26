import '../setup.js';
import { test, describe } from 'node:test';
import { addTodo, randomTodo, checkTodo, uncheckTodo } from './todoDsl.js';

describe('Uncheck todo', () => {
  test('should mark todo as not completed', async () => {
    const todo = randomTodo();

    const result = await addTodo(todo);
    await checkTodo(result.id);
    await uncheckTodo(result.id);
  });

  test('should uncheck an already unchecked todo', async () => {
    const todo = randomTodo();

    const result = await addTodo(todo);
    await uncheckTodo(result.id);
  });

  test('should throw an error for non-existent todo', async () => {
    const nonExistentId = '01982e32-b58f-7051-a9ed-61e1f125b07c';

    await uncheckTodo(nonExistentId, 'Todo not found');
  });

  test('should throw an error for invalid todo ID format', async () => {
    const invalidId = 'invalid-id';

    await uncheckTodo(
      invalidId,
      'The provided todoId does not match the UUIDv7 format'
    );
  });
});
