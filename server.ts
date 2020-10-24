import app from './app';
import createDatabaseConnection from './src/database/index';

/**
 * Start Express server and DB connection.
 */
(async () => {
  createDatabaseConnection();
  app.listen(process.env.PORT, () => {
    console.log(`App is running at http://${process.env.HOST}:${process.env.PORT} in ${process.env.ENV} mode`);
    console.log("  Press CTRL-C to stop\n");
  });
})();
