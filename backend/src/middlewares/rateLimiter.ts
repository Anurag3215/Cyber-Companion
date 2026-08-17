import rateLimit from 'express-rate-limit';

// General API rate limiter: max 100 requests per 15 minutes
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter rate limiter for threat scanning (external API proxying)
export const scanLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: 'Too many scan requests from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});
