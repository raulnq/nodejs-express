import dotenv from 'dotenv';
dotenv.config();

const config = {
  development: {
    client: 'pg',
    connection: process.env.CONNECTION_STRING,
    migrations: {
      directory: './migrations',
      extension: 'js',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
  test: {
    client: 'pg',
    connection: process.env.CONNECTION_STRING,
    migrations: {
      directory: './migrations',
      extension: 'js',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};

export default config;
