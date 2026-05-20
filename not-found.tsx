import { AIAnalysis, UrgencyLevel, ComplaintCategory } from '@/types';

export interface AIAnalysisInput {
  title: string;
  description: string;
  images: string[];
  category?: string;
}

export async function analyzeComplaint(input: AIAnalysisInput): Promise<AIAnalysis> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Mock AI analysis based on input content
  const hasInfrastructure = /fan|lab|ceiling|broken|repair|fix/i.test(input.title + ' ' + input.description);
  const hasSafety = /water|unsafe|danger|hazard|sick|health/i.test(input.title + ' ' + input.description);
  const hasFood = /food|canteen|meal|eat|poison/i.test(input.title + ' ' + input.description);
  const hasTransport = /bus|transport|route|vehicle/i.test(input.title + ' ' + input.description);

  let predictedCategory: ComplaintCategory = 'OTHER';
  if (hasInfrastructure) predictedCategory = 'INFRASTRUCTURE';
  else if (hasSafety) predictedCategory = 'SAFETY';
  else if (hasFood) predictedCategory = 'CANTEEN';
  else if (hasTransport) predictedCategory = 'TRANSPORTATION';

  const imageCount = input.images.length;
  const imageQuality = imageCount > 0 ? 75 + Math.floor(Math.random() * 20) : 0;

  const fraudRisk = Math.floor(Math.random() * 15);
  const duplicateScore = Math.random() * 0.3;

  let urgency: UrgencyLevel = 'MEDIUM';
  if (/critical|urgent|immediate|danger|health|safety/i.test(input.title)) urgency = 'CRITICAL';
  else if (/high|serious|important/i.test(input.title)) urgency = 'HIGH';
  else if (/minor|small|low/i.test(input.title)) urgency = 'LOW';

  const confidence = Math.min(95, 60 + imageQuality * 0.2 + (1 - duplicateScore) * 20 + (fraudRisk < 10 ? 15 : 0));

  return {
    categoryPrediction: [
      { category: predictedCategory, confidence: 0.85 + Math.random() * 0.1 },
      { category: 'INFRASTRUCTURE', confidence: 0.3 + Math.random() * 0.2 },
    ],
    imageQuality: {
      score: imageQuality,
      issues: imageCount === 0 ? ['no_images'] : imageQuality < 80 ? ['slight_blur'] : [],
    },
    duplicateDetection: {
      isDuplicate: duplicateScore > 0.7,
      similarity: duplicateScore,
    },
    fraudRisk: {
      score: fraudRisk,
      flags: fraudRisk > 20 ? ['sensitive_claim'] : [],
    },
    urgencySuggestion: urgency,
    summary: `Issue reported regarding ${predictedCategory.toLowerCase().replace('_', ' ')}. ${input.description.slice(0, 100)}...`,
    confidenceExplanation: `Analysis based on ${imageCount} image${imageCount !== 1 ? 's' : ''}, text sentiment, and historical pattern matching. ${fraudRisk < 10 ? 'Low fraud risk detected.' : 'Some flags require review.'}`,
  };
}

export async function checkImageQuality(imageUrl: string): Promise<{ score: number; issues: string[] }> {
  await new Promise(resolve => setTimeout(resolve, 500));
  const score = 70 + Math.floor(Math.random() * 25);
  const issues = score < 80 ? ['slight_blur'] : [];
  return { score, issues };
}

export async function detectDuplicate(title: string, description: string): Promise<{ isDuplicate: boolean; similarity: number; originalId?: string }> {
  await new Promise(resolve => setTimeout(resolve, 800));
  const similarity = Math.random() * 0.4;
  return {
    isDuplicate: similarity > 0.7,
    similarity,
  };
}

export async function generateEmailSummary(complaint: { title: string; description: string; category: string }): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 600));
  return `Dear Administrator,

A new complaint has been filed regarding ${complaint.category.toLowerCase().replace('_', ' ')} at your institution.

Title: ${complaint.title}

Summary: ${complaint.description.slice(0, 200)}...

Please review and respond within the specified SLA timeframe.

Best regards,
EduWatch System`;
}
