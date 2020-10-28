import express from 'express';
import asyncHandler from '../../service/asyncHandler';
import { getRepository } from 'typeorm';
import User from '../../models/User';
import { auth, getIdFromToken } from '../../service/authService';

const router = express.Router();

router.post('/', asyncHandler(async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  const previousUser = await getRepository(User).findOne({ email: req.body.user.email });
  if (!previousUser) {
    const newUser: User = new User();
    newUser.email = req.body.user.email;
    await newUser.setEncryptedPassword(req.body.user.password);
    const user = await getRepository(User).save(newUser);
    res.json({ "message": "User created successfully" });
  } else {
    res.status(401);
    res.json({ "message": "Email already used" });
  }

}));

/*router.get('/', asyncHandler(async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  const allUsers = await getRepository(User).find();
  res.send(allUsers);
}));*/

router.get('/', auth.required, asyncHandler(async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  const user = await getRepository(User).findOne(getIdFromToken(req), { relations: ["educationList", "experiences", "languages"] });
  if (user) {
    res.json({ user });
  } else {
    res.status(404).send('User not found');
  }
}));

router.put('/', auth.required, asyncHandler(async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  const user = await getRepository(User).findOne(getIdFromToken(req));
  if (user) {
    getRepository(User).merge(user, req.body.user);
    const results = await getRepository(User).save(user);
    return res.send({ "user": results });
  } else {
    res.status(404).send('User not found');
  }
}));

router.delete("/", auth.required, asyncHandler(async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  const results = await getRepository(User).delete(getIdFromToken(req));
  return res.send(results);
}));

router.post('/signin', asyncHandler(async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  const user = await getRepository(User).findOne({ email: req.body.user.email });
  if (user) {
    const hasGoodCredentials: boolean = await User.hasGoodCredentials(req.body.user.password, user.password);
    if (hasGoodCredentials) {
      res.cookie('token', user.generateJWT(), { expires: new Date(Date.now() + 1296000000), httpOnly: true });
      return res.json({ user });
    } else {
      return res.status(401).send("Wrong credentials");
    }
  } else {
    res.status(404).send('User not found');
  }
}));

router.get('/ping', auth.required, asyncHandler(async function (req, res, next) {
  res.json({ 'message': 'User logged in' });
}));

router.get('/logout', auth.required, asyncHandler(async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  res.cookie('token', '', { expires: new Date(0) });
  res.json({ 'message': 'Logout successful' });
}));

export default router;
