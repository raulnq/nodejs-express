import { after } from 'node:test';
import db from '../src/config/database.js';

after(async () => {
  await db.destroy();
});
