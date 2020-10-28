import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './src/routes/index';
import HttpException from './src/exceptions/HttpException'

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.CROSSORIGIN);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
/** Routes */
app.use('/', indexRouter);

/** catch 404 and forward to error handler */
app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
  const err: HttpException = new HttpException(404, `Not Found: ${req.ip} tried to reach ${req.originalUrl}`);
  next(err);
});

/** Error Handler */
app.use(function (err: HttpException, req: express.Request, res: express.Response, next: express.NextFunction) {
  res.status(err.status || 500).send({ error: err.message });
});

export default app;
