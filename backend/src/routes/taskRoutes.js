import { Router } from 'express';
import {
  getTasks,
  getTasksByProject,
  createTask,
  updateTaskProgress,
  updateTaskStatus
} from '../controllers/taskController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', getTasks);
router.get('/project/:projectId', getTasksByProject);
router.post('/project/:projectId', createTask);
router.post('/', createTask);

router.patch('/:id/progress', updateTaskProgress);
router.patch('/:id/status', updateTaskStatus);
router.patch('/:id', updateTaskProgress);

export default router;
