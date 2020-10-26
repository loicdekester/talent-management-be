import express from 'express';
import asyncHandler from '../../service/asyncHandler';
import { getRepository } from 'typeorm';
import User from '../../models/User';

const router = express.Router();

router.post('/', asyncHandler(async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  const newUser: User = new User();
  newUser.email = req.body.user.email;
  newUser.password = req.body.user.password;
  const user = await getRepository(User).save(newUser);
  res.send(user);
}));

router.get('/', asyncHandler(async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  const allUsers = await getRepository(User).find();
  res.send(allUsers);
}));

router.get('/:id', asyncHandler(async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  const user = await getRepository(User).findOne(req.params.id, { relations: ["educationList", "experiences", "languages"] });
  if (user) {
    res.send(user);
  } else {
    res.status(404).send('User not found');
  }
}));

router.put('/:id', asyncHandler(async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  const user = await getRepository(User).findOne(req.params.id);
  if (user) {
    getRepository(User).merge(user, req.body.user);
    const results = await getRepository(User).save(user);
    return res.send(results);
  } else {
    res.status(404).send('User not found');
  }
}));

router.delete("/:id", asyncHandler(async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  const results = await getRepository(User).delete(req.params.id);
  return res.send(results);
}));

export default router;
