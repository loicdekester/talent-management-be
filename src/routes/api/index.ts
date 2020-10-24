import express from 'express';
import users from './users';
const router = express.Router();

router.use('/users', users);

router.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
  return next(err);
});

export default router;
