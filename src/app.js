import express from 'express';
import dotenv from 'dotenv';
import todosRoutes from './features/todos/routes.js';
import healthRoutes from './routes/health.js';
import { errorHandler, NotFoundError } from './middlewares/errorHandler.js';
import morgan from 'morgan';
import expressWinston from 'express-winston';
import logger from './config/logger.js';
import helmet from 'helmet';
import cors from 'cors';
import swaggerRoutes from './routes/swagger.js';

dotenv.config();
const app = express();
app.use(helmet());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
  })
);
app.use(express.json());
app.use(morgan('dev'));
app.use(
  expressWinston.logger({
    winstonInstance: logger,
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
  })
);
app.use('/api-docs', swaggerRoutes);
app.use('/health', healthRoutes);
app.use('/api/todos', todosRoutes);
app.all('/*splat', (req, res, next) => {
  const pathSegments = req.params.splat;
  const fullPath = pathSegments.join('/');
  next(new NotFoundError(`The requested URL /${fullPath} does not exist`));
});
app.use(
  expressWinston.errorLogger({
    winstonInstance: logger,
    msg: '{{err.message}} {{res.statusCode}} {{req.method}}',
  })
);
app.use(errorHandler);

export default app;
