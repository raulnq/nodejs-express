import { ValidationError } from './errorHandler.js';
import * as yup from 'yup';

export const schemaValidator = schema => {
  return async (req, res, next) => {
    try {
      if (schema.body) {
        req.body = await schema.body.validate(req.body, {
          abortEarly: false,
          stripUnknown: true,
        });
      }
      if (schema.query) {
        req.validatedQuery = await schema.query.validate(req.query, {
          abortEarly: false,
          stripUnknown: true,
        });
      }
      next();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return next(new ValidationError(error.errors));
      }
      throw error;
    }
  };
};
