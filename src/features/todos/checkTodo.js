import db from '../../config/database.js';

export const checkTodo = async (req, res) => {
  await db('todos').where('id', req.todo.id).update({
    completed: true,
  });

  const updatedTodo = await db('todos').where('id', req.todo.id).first();
  res.status(200).json(updatedTodo);
};
