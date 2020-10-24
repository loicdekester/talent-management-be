import express from 'express';
import { getRepository } from 'typeorm';
import User from '../../models/User';

const router = express.Router();

router.post('/', async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  const newUser: User = new User();
  newUser.email = req.body.user.email;
  newUser.password = req.body.user.password;
  const user = await getRepository(User).save(newUser);
  res.send(user);
});

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

export default router;
