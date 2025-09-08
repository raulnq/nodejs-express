import express from 'express';
import healthcheck from 'express-healthcheck';
import pTimeout from 'p-timeout';
const router = express.Router();
import db from '../config/database.js';

router.use(
  '/live',
  healthcheck({
    healthy: () => ({
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: Date.now(),
    }),
  })
);

async function checkSeq() {
  try {
    const res = await pTimeout(fetch(`${process.env.SEQ_UI_URL}/health`), {
      milliseconds: parseInt(process.env.HEALTH_CHECK_TIMEOUT),
      message: 'Seq check timeout',
    });
    if (res.ok) return { status: 'up' };
    return { status: 'down', error: res.statusText };
  } catch (err) {
    if (err instanceof AggregateError) {
      return {
        status: 'down',
        error: err.errors.map(e => e.message).join(', '),
      };
    }
    return { status: 'down', error: err.message };
  }
}

async function checkPostgres() {
  try {
    await pTimeout(db.raw('SELECT 1'), {
      milliseconds: parseInt(process.env.HEALTH_CHECK_TIMEOUT),
      message: 'Postgres check timeout',
    });
    return { status: 'up' };
  } catch (err) {
    if (err instanceof AggregateError) {
      return {
        status: 'down',
        error: err.errors.map(e => e.message).join(', '),
      };
    }
    return { status: 'down', error: err.message };
  }
}

router.use(
  '/ready',
  healthcheck({
    healthy: () => ({
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: Date.now(),
    }),
    test: async callback => {
      const [postgresResult, seqResult] = await Promise.all([
        checkPostgres(),
        checkSeq(),
      ]);
      const allUp = [postgresResult, seqResult].every(
        result => result.status === 'up'
      );

      if (!allUp) {
        callback({
          status: 'unhealthy',
          dependencies: {
            postgres: { ...postgresResult },
            seq: { ...seqResult },
          },
          uptime: process.uptime(),
          timestamp: Date.now(),
        });
      }
      callback();
    },
  })
);

export default router;
