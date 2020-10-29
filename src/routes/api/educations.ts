import express from 'express';
import asyncHandler from '../../service/asyncHandler';
import { getRepository } from 'typeorm';
import Education from '../../models/Education';
import { auth, getIdFromToken } from '../../service/authService';

const router = express.Router();

router.delete("/:id", auth.required, asyncHandler(async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  const results = await getRepository(Education).delete(req.params.id);
  return res.send(results);
}));

export default router;
