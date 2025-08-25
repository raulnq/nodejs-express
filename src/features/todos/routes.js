import express from 'express';
import { addTodo, addTodoSchema } from './addTodo.js';
import { findTodo, ensureTodoFound } from './findTodo.js';
import { checkTodo } from './checkTodo.js';
import { uncheckTodo } from './uncheckTodo.js';
import { listTodos, listTodosSchema } from './listTodos.js';
import { paginationParam } from '../../middlewares/paginationParam.js';
import { schemaValidator } from '../../middlewares/schemaValidator.js';

const router = express.Router();

router.param('todoId', ensureTodoFound);

router
  .post('/', schemaValidator({ body: addTodoSchema }), addTodo)
  .get('/:todoId', findTodo)
  .post('/:todoId/check', checkTodo)
  .post('/:todoId/uncheck', uncheckTodo)
  .get(
    '/',
    schemaValidator({ query: listTodosSchema }),
    paginationParam,
    listTodos
  );

export default router;
