export const errorSchemas = {
  validationError: {
    type: '/problems/validation-error',
    title: 'ValidationError',
    detail: ['Error description'],
    instance: 'resource path',
    status: 400,
  },
  unauthorizedError: {
    type: '/problems/unauthorized',
    title: 'Unauthorized',
    detail: 'Error description',
    instance: 'resource path',
    status: 401,
  },
  notFoundError: {
    type: '/problems/resource-not-found',
    title: 'NotFoundError',
    detail: 'Error description',
    instance: 'resource path',
    status: 404,
  },
};
