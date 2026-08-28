import { Router } from 'express';
import { getNotifications, markAsRead, markAllRead } from '../controllers/notificationController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', getNotifications);
router.patch('/mark-all-read', markAllRead);
router.post('/mark-all-read', markAllRead);
router.patch('/:id/read', markAsRead);

export default router;
