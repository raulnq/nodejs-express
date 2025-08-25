import express from 'express';
import dotenv from 'dotenv';
import todosRoutes from './features/todos/routes.js';

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use('/api/todos', todosRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
