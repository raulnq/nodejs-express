import winston from 'winston';
import { SeqTransport } from '@datalust/winston-seq';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: {
    application: 'todo-api',
  },
  transports: [
    new SeqTransport({
      serverUrl: process.env.SEQ_URL,
      apiKey: process.env.SEQ_API_KEY,
      handleExceptions: true,
      handleRejections: true,
      onError: e => {
        console.error('[Seq] Failed to send log:', e.message);
      },
    }),
  ],
});

export default logger;
