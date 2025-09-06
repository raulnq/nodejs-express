import db from '../../config/database.js';
import { v7 as uuidv7 } from 'uuid';
import * as yup from 'yup';
import logger from '../../config/logger.js';
export const addTodoSchema = yup.object({
  title: yup.string().required(),
});

export const addTodo = async (req, res) => {
  const todo = {
    id: uuidv7(),
    title: req.body.title,
    completed: false,
    created_at: new Date(),
  };
  logger.info('Adding a new todo {id}', { id: todo.id, title: todo.title });
  await db('todos').insert(todo);
  res.status(201).json(todo);
};
