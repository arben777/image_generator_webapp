document.getElementById('generate').addEventListener('click', function() {
  var prompt = document.getElementById('prompt').value;
  fetch('/.netlify/functions/generate-image', {
    method: 'POST',
    body: JSON.stringify({ prompt: prompt })
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('image').src = data.url;
    document.getElementById('post').disabled = false;
  });
});

document.getElementById('post').addEventListener('click', function() {
  var url = document.getElementById('image').src;
  fetch('https://<your-supabase-url>/rest/v1/images', {
    method: 'POST',
    headers: {
      'apikey': '<your-supabase-api-key>',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url: url })
  })
  .then(response => response.json())
  .then(data => {
    var img = document.createElement('img');
    img.src = url;
    document.getElementById('collage').appendChild(img);
    document.getElementById('post').disabled = true;
  });
});