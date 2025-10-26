import db from '../../config/database.js';

export const checkTodo = async (req, res) => {
  /*
  #swagger.tags = ['Todos']
  #swagger.summary = 'Mark a todo as completed'
  #swagger.description = 'Update a specific todo item to mark it as completed'
  #swagger.parameters['todoId'] = {
    in: 'path',
    description: 'Todo item unique identifier',
    required: true,
    type: 'string'
  }
  #swagger.responses[200] = {
    description: 'Todo marked as completed successfully',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/todo'
        }
      }
    }
  }
  #swagger.responses[404] = {$ref: '#/components/responses/notFoundError'}
   */
  await db('todos').where('id', req.todo.id).update({
    completed: true,
  });

  const updatedTodo = await db('todos').where('id', req.todo.id).first();
  res.status(200).json(updatedTodo);
};
