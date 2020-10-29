import express from 'express';
import asyncHandler from '../../service/asyncHandler';
import { getRepository } from 'typeorm';
import WorkExperience from '../../models/WorkExperience';
import { auth, getIdFromToken } from '../../service/authService';

const router = express.Router();

router.delete("/:id", auth.required, asyncHandler(async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  const results = await getRepository(WorkExperience).delete(req.params.id);
  return res.send(results);
}));

export default router;
