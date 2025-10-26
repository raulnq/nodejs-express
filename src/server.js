import app from './app.js';

const PORT = process.env.PORT || 3000;

process.on('uncaughtException', err => {
  console.error(err.name, err.message);
  process.exit(1);
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('unhandledRejection', err => {
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
