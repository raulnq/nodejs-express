import db from '../../config/database.js';
import { v7 as uuidv7 } from 'uuid';
import * as yup from 'yup';
import logger from '../../config/logger.js';
export const addTodoSchema = yup.object({
  title: yup.string().required(),
});

export const addTodo = async (req, res) => {
  /*
  #swagger.tags = ['Todos']
  #swagger.summary = 'Create a new todo'
  #swagger.description = 'Create a new todo item with a title and default completion status'
  #swagger.requestBody = {
    required: true,
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/addTodo'
        }
      }
    }
  }
  #swagger.responses[201] = {
    description: 'Todo created successfully',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/todo'
        }
      }
    }
  }
  #swagger.responses[400] = {$ref: '#/components/responses/validationError'}
  #swagger.responses[401] = {$ref: '#/components/responses/unauthorizedError'}
  #swagger.security = [{
    bearerAuth: []
  }]
  */
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
