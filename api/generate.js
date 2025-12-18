const Replicate = require('replicate');

// Initialize Replicate with API token from environment variable
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { image, prompt } = req.body;

    console.log('Image data received:', image ? `${image.substring(0, 50)}...` : 'No image');
    console.log('Using provided prompt');

    // Prepare the input with the reference image
    const input = {
      prompt: prompt,
      aspect_ratio: '3:4',
      output_format: 'png',
    };

    // Add the reference image if provided
    if (image) {
      input.image_input = [image];
      console.log('Added reference image to input');
    }

    console.log('Creating Replicate prediction with prompt:', prompt.substring(0, 100) + '...');

    // Use predictions.create() instead of run() to avoid timeout
    // This returns immediately with a prediction ID
    const prediction = await replicate.predictions.create({
      model: 'google/nano-banana-pro',
      input: input,
    });

    console.log('Prediction created with ID:', prediction.id);
    console.log('Prediction status:', prediction.status);

    res.json({
      success: true,
      predictionId: prediction.id,
      status: prediction.status,
    });

  } catch (error) {
    console.error('Error creating prediction:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
