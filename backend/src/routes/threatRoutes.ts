import { Router } from 'express';
import { scanUrl } from '../controllers/threatController';
import { scanLimiter } from '../middlewares/rateLimiter';

const router = Router();

// Apply stricter rate limiting to threat scanning
router.post('/scan/url', scanLimiter, scanUrl);

export default router;
