document.getElementById('generate').addEventListener('click', function() {
  var prompt = document.getElementById('prompt').value;
  fetch('/.netlify/functions/generate-image', {
    method: 'POST',
    body: JSON.stringify({ type: 'generate', prompt: prompt })
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('image').src = data.url;
    document.getElementById('post').disabled = false;
  });
});

document.getElementById('post').addEventListener('click', function() {
  var url = document.getElementById('image').src;
  fetch('/.netlify/functions/generate-image', {
    method: 'POST',
    headers: {
      'apikey': process.env.SUPABASE_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ type: 'post', url: url })
  })
  .then(response => response.json())
  .then(data => {
    var img = document.createElement('img');
    img.src = url;
    document.getElementById('collage').appendChild(img);
    document.getElementById('post').disabled = true;
  });
});