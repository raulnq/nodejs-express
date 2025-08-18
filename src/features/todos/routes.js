import express from 'express';
import { addTodo } from './addTodo.js';
import { findTodo, ensureTodoFound } from './findTodo.js';
import { checkTodo } from './checkTodo.js';
import { uncheckTodo } from './uncheckTodo.js';
import { listTodos } from './listTodos.js';
import { paginationParam } from '../../middlewares/paginationParam.js';

const router = express.Router();
router
  .post('/', addTodo)
  .get('/:todoId', ensureTodoFound, findTodo)
  .post('/:todoId/check', ensureTodoFound, checkTodo)
  .post('/:todoId/uncheck', ensureTodoFound, uncheckTodo)
  .get('/', paginationParam, listTodos);

export default router;
