import { analyzePermissions } from './permissionAnalyzerService';
import { analyzeWifi } from './wifiAnalyzerService';
import { analyzeUrlThreats } from './threatIntelligenceService';

export interface EvaluationPayload {
  appPermissions?: string[];
  wifiStatus?: { ssid: string; protocol: string };
  recentUrls?: string[];
}

export interface HolisticSecurityScore {
  finalScore: number;
  status: 'Safe' | 'Warning' | 'Critical';
  breakdown: {
    permissionRisk: number;
    wifiRisk: number;
    urlRisk: number;
  };
  recommendations: string[];
}

export const evaluateSecurityScore = async (payload: EvaluationPayload): Promise<HolisticSecurityScore> => {
  let permissionRisk = 0;
  let wifiRisk = 0;
  let urlRisk = 0;
  const recommendations: string[] = [];

  // 1. Evaluate Permissions (Weight: 30%)
  if (payload.appPermissions && payload.appPermissions.length > 0) {
    const permResult = analyzePermissions(payload.appPermissions);
    permissionRisk = permResult.riskScore;
    if (permissionRisk > 30) {
      recommendations.push(...permResult.flaggedCombinations.map(c => `Review App Permissions: ${c}`));
    }
  }

  // 2. Evaluate Wi-Fi (Weight: 40%)
  if (payload.wifiStatus) {
    const wifiResult = analyzeWifi(payload.wifiStatus.ssid, payload.wifiStatus.protocol);
    wifiRisk = wifiResult.riskScore;
    if (wifiRisk >= 50) {
      recommendations.push(wifiResult.details);
    }
  }

  // 3. Evaluate URLs (Weight: 30%)
  if (payload.recentUrls && payload.recentUrls.length > 0) {
    let highestUrlRisk = 0;
    for (const url of payload.recentUrls) {
      const urlResult = await analyzeUrlThreats(url);
      if (urlResult.riskScore > highestUrlRisk) {
        highestUrlRisk = urlResult.riskScore;
      }
    }
    urlRisk = highestUrlRisk;
    if (urlRisk >= 70) {
      recommendations.push('Critical URLs detected in your recent history. Do not click unknown links.');
    } else if (urlRisk >= 30) {
      recommendations.push('Warning: Some recent URLs appear suspicious.');
    }
  }

  // Calculate Weighted Aggregate Score (Lower is better, but here we calculate risk 0-100 and invert it for the user)
  // Let's define the Final Score as a Safety Score (100 = perfectly safe, 0 = highly compromised)
  const totalRiskScore = (permissionRisk * 0.3) + (wifiRisk * 0.4) + (urlRisk * 0.3);
  const finalSafetyScore = Math.max(0, Math.round(100 - totalRiskScore));

  let status: 'Safe' | 'Warning' | 'Critical' = 'Safe';
  if (finalSafetyScore < 40) {
    status = 'Critical';
  } else if (finalSafetyScore < 75) {
    status = 'Warning';
  }

  if (recommendations.length === 0) {
    recommendations.push('Your device is currently secure. Keep up the good digital hygiene!');
  }

  return {
    finalScore: finalSafetyScore,
    status,
    breakdown: {
      permissionRisk,
      wifiRisk,
      urlRisk
    },
    recommendations
  };
};
