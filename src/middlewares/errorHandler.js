import { ProblemDocument } from 'http-problem-details';

class AppError extends Error {
  constructor(error, type, status, name) {
    super(error);
    this.type = type;
    this.name = name;
    this.status = status;
    this.detail = error;
  }
}

export class NotFoundError extends AppError {
  constructor(error) {
    super(error, 'resource-not-found', 404, 'NotFoundError');
  }
}

export class ValidationError extends AppError {
  constructor(error) {
    super(error, 'validation-error', 400, 'ValidationError');
  }
}

export class UnauthorizedError extends AppError {
  constructor(error) {
    super(error, 'unauthorized', 401, 'Unauthorized');
  }
}

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    const problem = new ProblemDocument({
      type: '/problems/' + err.type.toLowerCase(),
      title: err.name,
      status: err.status,
      detail: err.detail,
      instance: req.originalUrl,
    });
    res.status(err.status).json(problem);
  } else {
    if (process.env.NODE_ENV === 'production') {
      res.status(500).json(
        new ProblemDocument({
          type: '/problems/internal-server-error',
          title: 'InternalServerError',
          status: 500,
          instance: req.path,
        })
      );
    } else {
      res.status(err.status || 500).json({
        error: err.message,
        stack: err.stack,
        timestamp: new Date().toISOString(),
        path: req.path,
      });
    }
  }
};
