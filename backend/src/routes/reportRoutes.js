import { Router } from 'express';
import { getProjectReports } from '../controllers/reportController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/project/:id', getProjectReports);
router.get('/:id', getProjectReports);

export default router;
