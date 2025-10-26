export const todoSchemas = {
  todo: {
    id: '01994462-a4d6-73bc-98fc-b861a38b1c0a',
    title: 'title',
    completed: false,
    created_at: '2023-10-10T12:00:00Z',
  },
  todoList: {
    items: [{ $ref: '#/components/schemas/todo' }],
    pageNumber: 1,
    pageSize: 10,
    totalPages: 5,
    totalItems: 50,
  },
  addTodo: {
    $title: 'title',
  },
};
