import app from "./app";

/**
 * Start Express server.
 */
app.set("port", process.env.PORT || 8080);
const server = app.listen(process.env.PORT, () => {
  console.log(`App is running at http://${process.env.HOST}:${process.env.PORT} in ${process.env.ENV} mode`);
  console.log("  Press CTRL-C to stop\n");
});

export default server;
