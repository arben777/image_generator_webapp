const axios = require('axios');

exports.handler = async function(event, context) {
  const { prompt } = JSON.parse(event.body);
  const response = await axios.post('https://process.env.REPLICATE_API_URL // Your Replicate API URL', {
    prompt: prompt,
    apikey: 'process.env.REPLICATE_API_TOKEN // Your Replicate API token'
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ url: response.data.url })
  };
};