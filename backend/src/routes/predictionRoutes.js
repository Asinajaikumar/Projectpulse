import { Router } from 'express';
import { getPrediction, runWhatIf } from '../controllers/predictionController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/project/:id', getPrediction);
router.get('/:id', getPrediction);
router.post('/what-if', runWhatIf);
router.post('/project/:id/what-if', runWhatIf);

export default router;
