import db from '../../config/database.js';

export const uncheckTodo = async (req, res) => {
  await db('todos').where('id', req.todo.id).update({
    completed: false,
  });

  const updatedTodo = await db('todos').where('id', req.todo.id).first();
  res.status(200).json(updatedTodo);
};
