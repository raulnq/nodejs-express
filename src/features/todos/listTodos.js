import db from '../../config/database.js';
import * as yup from 'yup';

export const listTodosSchema = yup.object({
  completed: yup.boolean().optional(),
  title: yup.string().trim().optional(),
  pageNumber: yup.number().integer().min(1).required(),
  pageSize: yup.number().integer().min(1).max(100).required(),
});

export const listTodos = async (req, res) => {
  const { completed, title } = req.validatedQuery;
  let baseQuery = db('todos');
  if (completed !== undefined) {
    baseQuery = baseQuery.where('completed', completed === 'true');
  }

  if (title && title.trim()) {
    baseQuery = baseQuery.where('title', 'ilike', `${title.trim()}%`);
  }

  const [{ count: total }] = await baseQuery.clone().count('* as count');
  const items = await baseQuery
    .select('*')
    .orderBy('created_at', 'desc')
    .limit(req.pagination.pageSize)
    .offset(req.pagination.offset);

  const totalCount = parseInt(total);

  res.status(200).json({
    items,
    pageNumber: req.pagination.pageNumber,
    pageSize: req.pagination.pageSize,
    totalPages: Math.ceil(totalCount / req.pagination.pageSize),
    totalItems: totalCount,
  });
};
