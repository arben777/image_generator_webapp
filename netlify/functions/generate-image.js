const axios = require('axios');

exports.handler = async function(event, context) {
  const { prompt } = JSON.parse(event.body);
  const response = await axios.post('https://<your-image-generation-api-url>', {
    prompt: prompt,
    apikey: '<your-image-generation-api-key>'
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ url: response.data.url })
  };
};