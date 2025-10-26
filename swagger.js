import swaggerAutogen from 'swagger-autogen';
import { todoSchemas } from './src/features/todos/schemas.js';
import { errorSchemas } from './src/middlewares/schemas.js';
const HOST = process.env.HOST || 'localhost:5000';
const SCHEMA = process.env.SCHEMA || 'http';
const doc = {
  info: {
    title: 'My API',
    description: 'API Documentation',
    version: '1.0.0',
  },
  servers: [{ url: `${SCHEMA}://${HOST}` }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'JWT Bearer token for user authentication',
      },
    },
    schemas: {
      ...todoSchemas,
      ...errorSchemas,
    },
    parameters: {
      pageNumber: {
        name: 'pageNumber',
        in: 'query',
        description: 'Page number for pagination',
        required: true,
        default: 1,
        schema: {
          type: 'integer',
        },
      },
      pageSize: {
        name: 'pageSize',
        in: 'query',
        description: 'Page size for pagination',
        required: true,
        default: 10,
        schema: {
          type: 'integer',
        },
      },
    },
    responses: {
      unauthorizedError: {
        description: 'Unauthorized',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/unauthorizedError' },
          },
        },
      },
      validationError: {
        description: 'Validation Error',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/validationError' },
          },
        },
      },
      notFoundError: {
        description: 'Not Found',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/notFoundError' },
          },
        },
      },
    },
  },
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/server.js'];

swaggerAutogen({ openapi: '3.0.0', autoQuery: false, autoHeaders: false })(
  outputFile,
  endpointsFiles,
  doc
);
