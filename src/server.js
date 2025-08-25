import express from 'express';
import dotenv from 'dotenv';
import todosRoutes from './features/todos/routes.js';
import { errorHandler, NotFoundError } from './middlewares/errorHandler.js';

process.on('uncaughtException', err => {
  console.error(err.name, err.message);
  process.exit(1);
});
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use('/api/todos', todosRoutes);
app.all('/*splat', (req, res, next) => {
  const pathSegments = req.params.splat;
  const fullPath = pathSegments.join('/');
  next(new NotFoundError(`The requested URL /${fullPath} does not exist`));
});
app.use(errorHandler);
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('unhandledRejection', err => {
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
