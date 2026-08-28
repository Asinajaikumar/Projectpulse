import { Router } from 'express';
import { getCommentsByTask, addComment, deleteComment } from '../controllers/commentController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/task/:taskId', getCommentsByTask);
router.post('/task/:taskId', addComment);
router.delete('/:id', deleteComment);

export default router;
