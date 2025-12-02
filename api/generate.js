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

    console.log('Calling Replicate API with prompt:', prompt.substring(0, 100) + '...');

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
      imageUrl: 'https://images.unsplash.com/photo-1542190891-2093d38760f2?w=800&q=80'
    });
  }
};
