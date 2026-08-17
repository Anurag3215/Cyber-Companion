export interface PermissionAnalysisResult {
  riskScore: number;
  flaggedCombinations: string[];
  details: string;
}

const HIGH_RISK_PERMISSIONS = ['CAMERA', 'RECORD_AUDIO', 'READ_SMS', 'READ_CONTACTS', 'ACCESS_FINE_LOCATION'];

export const analyzePermissions = (permissions: string[]): PermissionAnalysisResult => {
  let riskScore = 0;
  const flaggedCombinations: string[] = [];

  // Check for individual high-risk permissions
  const highRiskCount = permissions.filter(p => HIGH_RISK_PERMISSIONS.includes(p.toUpperCase())).length;
  riskScore += highRiskCount * 10;

  // Check for dangerous combinations
  const hasCamera = permissions.includes('CAMERA');
  const hasLocation = permissions.includes('ACCESS_FINE_LOCATION');
  const hasSms = permissions.includes('READ_SMS');
  const hasMicrophone = permissions.includes('RECORD_AUDIO');
  const hasContacts = permissions.includes('READ_CONTACTS');

  if (hasCamera && hasLocation) {
    riskScore += 20;
    flaggedCombinations.push('Camera + Location: High tracking risk.');
  }
  
  if (hasSms && hasContacts) {
    riskScore += 25;
    flaggedCombinations.push('SMS + Contacts: High data exfiltration/phishing risk.');
  }

  if (hasMicrophone && hasCamera) {
    riskScore += 25;
    flaggedCombinations.push('Microphone + Camera: High surveillance risk.');
  }

  // Cap score at 100
  riskScore = Math.min(riskScore, 100);

  return {
    riskScore,
    flaggedCombinations,
    details: flaggedCombinations.length > 0 ? 'High-risk permission combinations detected.' : 'App permissions appear standard.'
  };
};
