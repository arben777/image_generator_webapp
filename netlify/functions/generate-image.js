const axios = require('axios');

exports.handler = async function(event, context) {
  const { type, prompt, url } = JSON.parse(event.body);

  // For generating image
  if (type === 'generate') {
    const response = await axios.post(`https://${process.env.REPLICATE_API_URL}`, {
      prompt: prompt,
      apikey: process.env.REPLICATE_API_TOKEN
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ url: response.data.url })
    };
  }
  
  // For posting image to Supabase
  if (type === 'post') {
    const response = await axios.post(`https://${process.env.SUPABASE_URL}/rest/v1/images`, {
      url: url
    }, {
      headers: {
        'apikey': process.env.SUPABASE_API_KEY,
        'Content-Type': 'application/json'
      }
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  }

  // For invalid request type
  return {
    statusCode: 400,
    body: JSON.stringify({ error: 'Invalid request type' })
  };
};
