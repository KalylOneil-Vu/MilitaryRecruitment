const express = require('express');
const cors = require('cors');
const Replicate = require('replicate');

const app = express();
const PORT = 3002;

// Initialize Replicate with API token from environment variable
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Generate image endpoint
app.post('/api/generate', async (req, res) => {
  try {
    const { image, prompt, sex, mosTitle, promptModifier } = req.body;

    console.log('Image data received:', image ? `${image.substring(0, 50)}...` : 'No image');

    // Use provided prompt directly, or build one from legacy fields
    let fullPrompt;
    if (prompt) {
      // New approach: prompt is passed directly from frontend
      fullPrompt = prompt;
      console.log('Using provided prompt');
    } else {
      // Legacy approach: build prompt from individual fields
      console.log('Building prompt from legacy fields - sex:', sex, 'mosTitle:', mosTitle);
      const genderText = sex === 'male' ? 'man' : 'woman';
      fullPrompt = `Transform this person into a professional portrait of a ${genderText} as a US Army ${mosTitle}. Keep the person's face and features exactly the same but dress them in military dress uniform with medals and insignia. ${promptModifier || ''}. American flag in background, studio lighting, photorealistic, highly detailed, sharp focus, professional military portrait photography, 8k quality. Maintain facial identity and likeness.`;
    }

    // Prepare the input with the reference image
    const input = {
      prompt: fullPrompt,
      aspect_ratio: '3:4',
      output_format: 'png',
    };

    // Add the reference image if provided (as data URL or regular URL)
    if (image) {
      // nano-banana-pro uses image_input for reference images
      input.image_input = [image];
      console.log('Added reference image to input');
    }

    console.log('Calling Replicate API with prompt:', fullPrompt.substring(0, 100) + '...');

    const output = await replicate.run('google/nano-banana-pro', { input });

    // Get the URL from the output
    let imageUrl;
    if (output && typeof output.url === 'function') {
      imageUrl = output.url();
    } else if (typeof output === 'string') {
      imageUrl = output;
    } else if (output && output[0]) {
      imageUrl = typeof output[0].url === 'function' ? output[0].url() : output[0];
    } else {
      imageUrl = output;
    }

    console.log('Generated image URL:', imageUrl);

    res.json({
      success: true,
      imageUrl: imageUrl,
    });

  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      // Return a fallback image on error
      imageUrl: 'https://images.unsplash.com/photo-1542190891-2093d38760f2?w=800&q=80'
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/generate`);
});
