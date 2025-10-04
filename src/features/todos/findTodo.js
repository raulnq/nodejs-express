import db from '../../config/database.js';
import {
  ValidationError,
  NotFoundError,
} from '../../middlewares/errorHandler.js';

const uuidv7Regex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const ensureTodoFound = async (req, res, next, todoId) => {
  if (!uuidv7Regex.test(todoId)) {
    return next(
      new ValidationError(
        'The provided todoId does not match the UUIDv7 format'
      )
    );
  }
  const todo = await db('todos').where('id', todoId).first();
  if (!todo) {
    return next(new NotFoundError('Todo not found'));
  }
  req.todo = todo;
  next();
};

export const findTodo = async (req, res) => {
  /*
  #swagger.tags = ['Todos']
  #swagger.summary = 'Get a specific todo by ID'
  #swagger.description = 'Retrieve a single todo item by its unique identifier'
  #swagger.parameters['todoId'] = {
    in: 'path',
    description: 'Todo item unique identifier',
    required: true,
    type: 'string'
  }
  #swagger.responses[200] = {
    description: 'Todo found successfully',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/todo'
        }
      }
    }
  }
  #swagger.responses[400] = {$ref: '#/components/responses/validationError'}
  #swagger.responses[404] = {$ref: '#/components/responses/notFoundError'}
   */
  res.status(200).json(req.todo);
};
