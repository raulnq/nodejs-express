import db from '../../config/database.js';

export const ensureTodoFound = async (req, res, next) => {
  const todo = await db('todos').where('id', req.params.todoId).first();
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  req.todo = todo;
  next();
};

export const findTodo = async (req, res) => {
  res.status(200).json(req.todo);
};
