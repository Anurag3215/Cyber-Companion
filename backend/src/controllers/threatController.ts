import { Request, Response, NextFunction } from 'express';
import { analyzeUrlThreats } from '../services/threatIntelligenceService';
import ScanHistory from '../models/ScanHistory';

export const scanUrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ status: 'error', message: 'URL is required for scanning' });
    }

    // 1. Check Cache (ScanHistory within last 24 hours)
    const recentScan = await ScanHistory.findOne({
      url,
      scannedAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    });

    if (recentScan) {
      return res.status(200).json({
        status: 'success',
        source: 'cache',
        data: recentScan
      });
    }

    // 2. Perform Threat Analysis
    const analysisResult = await analyzeUrlThreats(url);

    // 3. Save to History (Cache)
    const newScan = await ScanHistory.create({
      url: analysisResult.url,
      riskScore: analysisResult.riskScore,
      riskLevel: analysisResult.riskLevel,
      analysisDetails: { details: analysisResult.details }
    });

    return res.status(200).json({
      status: 'success',
      source: 'live',
      data: newScan
    });
  } catch (error) {
    next(error);
  }
};
