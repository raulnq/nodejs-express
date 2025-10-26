import '../setup.js';
import { test, describe } from 'node:test';
import { addTodo, randomTodo, checkTodo } from './todoDsl.js';

describe('Check todo', () => {
  test('should mark todo as completed', async () => {
    const todo = randomTodo();

    const result = await addTodo(todo);

    await checkTodo(result.id);
  });

  test('should throw an error for non-existent todo', async () => {
    const nonExistentId = '01982e32-b58f-7051-a9ed-61e1f125b07c';

    await checkTodo(nonExistentId, 'Todo not found');
  });

  test('should throw an error for invalid todo ID format', async () => {
    const invalidId = 'invalid-id';

    await checkTodo(
      invalidId,
      'The provided todoId does not match the UUIDv7 format'
    );
  });
});
