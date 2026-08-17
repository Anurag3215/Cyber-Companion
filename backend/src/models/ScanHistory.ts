import mongoose, { Document, Schema } from 'mongoose';

export interface IScanHistory extends Document {
  url: string;
  riskScore: number;
  riskLevel: 'Safe' | 'Warning' | 'Critical';
  analysisDetails: any;
  scannedAt: Date;
}

const ScanHistorySchema: Schema = new Schema({
  url: { type: String, required: true },
  riskScore: { type: Number, required: true },
  riskLevel: { type: String, enum: ['Safe', 'Warning', 'Critical'], required: true },
  analysisDetails: { type: Schema.Types.Mixed, default: {} },
  scannedAt: { type: Date, default: Date.now }
});

// Create a TTL index to expire scan history after 7 days (604800 seconds)
// This also acts as a form of caching where we can check recent scans for the same URL.
ScanHistorySchema.index({ scannedAt: 1 }, { expireAfterSeconds: 604800 });
ScanHistorySchema.index({ url: 1 });

export default mongoose.model<IScanHistory>('ScanHistory', ScanHistorySchema);
