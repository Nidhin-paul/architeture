import { Router } from 'express';
import { getProjects, getProjectBySlug, createProject } from '../controllers/projectController.js';

const router = Router();

router.route('/')
  .get(getProjects)
  .post(createProject);

router.route('/:slug')
  .get(getProjectBySlug);

export default router;
