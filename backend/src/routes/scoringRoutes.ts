import { Router } from 'express';
import { evaluateScore } from '../controllers/scoringController';
import { apiLimiter } from '../middlewares/rateLimiter';

const router = Router();

// Evaluate holistic security score
router.post('/evaluate', apiLimiter, evaluateScore);

export default router;
