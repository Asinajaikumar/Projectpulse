import { Router } from 'express';
import { getGithubActivity, syncGithub } from '../controllers/githubController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/activity', getGithubActivity);
router.get('/:projectId/activity', getGithubActivity);
router.post('/sync', syncGithub);

export default router;
