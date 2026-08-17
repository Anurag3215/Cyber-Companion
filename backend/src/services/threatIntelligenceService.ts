import axios from 'axios';
import { sanitizeUrl } from '../utils/sanitizer';

export interface ThreatAnalysisResult {
  url: string;
  riskScore: number;
  riskLevel: 'Safe' | 'Warning' | 'Critical';
  details: string;
}

export const analyzeUrlThreats = async (url: string): Promise<ThreatAnalysisResult> => {
  const sanitizedUrl = sanitizeUrl(url);

  // Fallback heuristics: check for IP literals or missing SSL
  const hasIpLiteral = /^(http|https):\/\/[0-9\.]+/.test(sanitizedUrl);
  const isHttp = sanitizedUrl.startsWith('http://');
  
  let heuristicScore = 0;
  if (hasIpLiteral) heuristicScore += 40;
  if (isHttp) heuristicScore += 20;

  // TODO: Integrate actual VT / Google Safe Browsing / URLScan.io logic here
  // For now, we mock the external API response
  const mockThreatFound = sanitizedUrl.includes('phishing') || sanitizedUrl.includes('malware');

  const finalScore = mockThreatFound ? 95 : heuristicScore;
  
  let riskLevel: 'Safe' | 'Warning' | 'Critical' = 'Safe';
  let details = 'No immediate threats detected based on current heuristics.';

  if (finalScore >= 70) {
    riskLevel = 'Critical';
    details = 'Critical threat detected: Suspicious URL patterns or known malicious domain.';
  } else if (finalScore >= 30) {
    riskLevel = 'Warning';
    details = 'Warning: This URL uses insecure protocols or contains suspicious IP formatting.';
  }

  return {
    url: sanitizedUrl,
    riskScore: finalScore,
    riskLevel,
    details
  };
};
