import express from 'express';
import users from './users';
import experiences from './experiences';
import educations from './educations';
const router = express.Router();

router.use('/users', users);
router.use('/experiences', experiences);
router.use('/educations', educations);

router.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
  return next(err);
});

export default router;
