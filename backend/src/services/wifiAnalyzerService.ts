export interface WifiAnalysisResult {
  riskScore: number;
  securityProtocol: string;
  details: string;
}

export const analyzeWifi = (ssid: string, protocol: string): WifiAnalysisResult => {
  let riskScore = 0;
  let details = 'Network encryption is strong and secure.';

  const upperProtocol = protocol.toUpperCase();

  if (upperProtocol.includes('OPEN') || upperProtocol === 'NONE') {
    riskScore = 90;
    details = 'Critical: Open Wi-Fi network detected. High risk of Man-in-the-Middle (MitM) attacks.';
  } else if (upperProtocol.includes('WEP')) {
    riskScore = 80;
    details = 'High: WEP encryption is deprecated and easily compromised.';
  } else if (upperProtocol.includes('WPA') && !upperProtocol.includes('WPA2') && !upperProtocol.includes('WPA3')) {
    riskScore = 50;
    details = 'Warning: WPA is outdated. WPA2 or WPA3 is recommended.';
  } else if (upperProtocol.includes('WPA2')) {
    riskScore = 10;
    details = 'Safe: WPA2 encryption detected.';
  } else if (upperProtocol.includes('WPA3')) {
    riskScore = 0;
    details = 'Very Safe: WPA3 encryption detected (Modern Standard).';
  }

  // Check for common public hotspot names that might be risky
  const riskySSIDs = ['freewifi', 'starbucks', 'mcdonalds', 'airport', 'public'];
  if (riskySSIDs.some(name => ssid.toLowerCase().includes(name)) && riskScore < 50) {
    riskScore += 30; // Bump risk for public hotspots even if seemingly encrypted (could be rogue AP)
    details += ' Note: This appears to be a public hotspot. Exercise caution.';
  }

  // Cap score at 100
  riskScore = Math.min(riskScore, 100);

  return {
    riskScore,
    securityProtocol: upperProtocol,
    details
  };
};
