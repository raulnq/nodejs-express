import express from 'express';
import { readFileSync } from 'node:fs';
import swaggerUi from 'swagger-ui-express';
const router = express.Router();

const swaggerFile = JSON.parse(readFileSync('./swagger-output.json', 'utf-8'));

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerFile));

export default router;
