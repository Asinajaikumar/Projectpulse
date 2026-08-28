import { Router } from 'express';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  addProjectMember,
  removeProjectMember,
  getProjectMembers
} from '../controllers/projectController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.post('/', requireRole('admin', 'team_leader'), createProject);
router.put('/:id', requireRole('admin', 'team_leader'), updateProject);
router.delete('/:id', requireRole('admin'), deleteProject);

router.get('/:id/members', getProjectMembers);
router.post('/:id/members', requireRole('admin', 'team_leader'), addProjectMember);
router.delete('/:id/members/:userId', requireRole('admin', 'team_leader'), removeProjectMember);

export default router;
