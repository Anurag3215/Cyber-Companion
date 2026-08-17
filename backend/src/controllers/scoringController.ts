import { Request, Response, NextFunction } from 'express';
import { evaluateSecurityScore, EvaluationPayload } from '../services/scoringEngineService';

export const evaluateScore = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload: EvaluationPayload = req.body;

    // Validate payload (Basic validation, in production use Zod)
    if (!payload.appPermissions && !payload.wifiStatus && !payload.recentUrls) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Payload must contain at least one of: appPermissions, wifiStatus, recentUrls' 
      });
    }

    const scoreResult = await evaluateSecurityScore(payload);

    return res.status(200).json({
      status: 'success',
      data: scoreResult
    });
  } catch (error) {
    next(error);
  }
};
