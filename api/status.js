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

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'Missing prediction ID' });
    }

    console.log('Checking status for prediction:', id);

    const prediction = await replicate.predictions.get(id);

    console.log('Prediction status:', prediction.status);

    // Handle different statuses
    if (prediction.status === 'succeeded') {
      // Get the output URL
      let imageUrl;
      const output = prediction.output;

      if (output && typeof output.url === 'function') {
        imageUrl = output.url();
      } else if (typeof output === 'string') {
        imageUrl = output;
      } else if (Array.isArray(output) && output[0]) {
        imageUrl = typeof output[0].url === 'function' ? output[0].url() : output[0];
      } else {
        imageUrl = output;
      }

      console.log('Generated image URL:', imageUrl);

      res.json({
        success: true,
        status: 'succeeded',
        imageUrl: imageUrl,
      });
    } else if (prediction.status === 'failed' || prediction.status === 'canceled') {
      console.error('Prediction failed:', prediction.error);
      res.json({
        success: false,
        status: prediction.status,
        error: prediction.error || 'Prediction failed',
      });
    } else {
      // Still processing (starting, processing)
      res.json({
        success: true,
        status: prediction.status,
      });
    }

  } catch (error) {
    console.error('Error checking prediction status:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
