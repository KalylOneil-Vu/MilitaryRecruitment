import { BiologicalSex, MOSOption, GeneratedImages } from '../types';

// Use relative URL for Vercel deployment, fallback to localhost for local dev
const BACKEND_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3002';

// Polling interval in ms
const POLL_INTERVAL = 2000;
// Max polling time (3 minutes)
const MAX_POLL_TIME = 180000;

// Helper to replace {sex} placeholder with actual gender term
function insertSexIntoPrompt(prompt: string, sex: BiologicalSex): string {
  const genderTerm = sex === 'male' ? 'male' : 'female';
  return prompt.replace(/{sex}/g, genderTerm);
}

// Start a prediction and return the prediction ID
async function startPrediction(
  imageBase64: string,
  prompt: string
): Promise<string> {
  const response = await fetch(`${BACKEND_URL}/api/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      image: imageBase64,
      prompt: prompt,
    }),
  });

  if (!response.ok) {
    throw new Error(`Backend request failed: ${response.status}`);
  }

  const data = await response.json();

  if (data.success && data.predictionId) {
    return data.predictionId;
  }

  throw new Error(data.error || 'Failed to start prediction');
}

// Poll for prediction status until complete
async function pollForResult(predictionId: string): Promise<string> {
  const startTime = Date.now();

  while (Date.now() - startTime < MAX_POLL_TIME) {
    const response = await fetch(`${BACKEND_URL}/api/status?id=${predictionId}`);

    if (!response.ok) {
      throw new Error(`Status check failed: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === 'succeeded' && data.imageUrl) {
      return data.imageUrl;
    }

    if (data.status === 'failed' || data.status === 'canceled') {
      throw new Error(data.error || 'Prediction failed');
    }

    // Still processing, wait and poll again
    console.log(`Prediction ${predictionId} status: ${data.status}`);
    await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL));
  }

  throw new Error('Prediction timed out after 3 minutes');
}

// Generate a single image with a given prompt (uses polling)
async function generateSingleImage(
  imageBase64: string,
  prompt: string
): Promise<string> {
  // Start the prediction
  const predictionId = await startPrediction(imageBase64, prompt);
  console.log('Prediction started with ID:', predictionId);

  // Poll for the result
  const imageUrl = await pollForResult(predictionId);
  return imageUrl;
}

// Generate dual portraits - portrait and field action shot
// Makes TWO separate API calls in parallel
export async function generateDualPortraits(
  imageBase64: string,
  sex: BiologicalSex,
  mos: MOSOption
): Promise<GeneratedImages> {
  console.log('Starting dual image generation...');
  console.log('Sex:', sex, 'MOS:', mos.title);

  // Prepare prompts with sex variable replaced
  const portraitPrompt = insertSexIntoPrompt(mos.portraitPrompt, sex);
  const fieldPrompt = insertSexIntoPrompt(mos.fieldPrompt, sex);

  console.log('Portrait prompt:', portraitPrompt.substring(0, 100) + '...');
  console.log('Field prompt:', fieldPrompt.substring(0, 100) + '...');

  try {
    // Make TWO separate API calls in parallel using Promise.all
    const [portraitImage, fieldImage] = await Promise.all([
      generateSingleImage(imageBase64, portraitPrompt),
      generateSingleImage(imageBase64, fieldPrompt),
    ]);

    console.log('Both images generated successfully');
    console.log('Portrait URL:', portraitImage);
    console.log('Field URL:', fieldImage);

    return {
      portrait: portraitImage,
      field: fieldImage,
    };
  } catch (error) {
    console.error('Error in dual generation:', error);
    // Return fallback images on error
    return {
      portrait: 'https://images.unsplash.com/photo-1542190891-2093d38760f2?w=800&q=80',
      field: 'https://images.unsplash.com/photo-1542190891-2093d38760f2?w=800&q=80',
    };
  }
}

// Legacy function for backwards compatibility (not used anymore)
export async function generateMilitaryPortrait(
  imageBase64: string,
  sex: BiologicalSex,
  mos: MOSOption
): Promise<string> {
  const prompt = insertSexIntoPrompt(mos.portraitPrompt, sex);
  return generateSingleImage(imageBase64, prompt);
}
