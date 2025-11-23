import { BiologicalSex, MOSOption } from '../types';

const BACKEND_URL = 'http://localhost:3002';

export async function generateMilitaryPortrait(
  imageBase64: string,
  sex: BiologicalSex,
  mos: MOSOption
): Promise<string> {
  try {
    console.log('Calling backend API to generate image...');

    const response = await fetch(`${BACKEND_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: imageBase64,
        sex: sex,
        mosTitle: mos.title,
        promptModifier: mos.promptModifier,
      }),
    });

    if (!response.ok) {
      throw new Error(`Backend request failed: ${response.status}`);
    }

    const data = await response.json();

    if (data.success && data.imageUrl) {
      console.log('Image generated successfully:', data.imageUrl);
      return data.imageUrl;
    }

    // Return fallback if there was an error but we got a fallback URL
    if (data.imageUrl) {
      return data.imageUrl;
    }

    throw new Error(data.error || 'Generation failed');
  } catch (error) {
    console.error('Error generating image:', error);
    // Return a fallback image on error
    return `https://images.unsplash.com/photo-1542190891-2093d38760f2?w=800&q=80`;
  }
}
