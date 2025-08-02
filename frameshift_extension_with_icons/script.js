document.addEventListener('DOMContentLoaded', () => {
  fetch('models.json')
    .then(res => res.json())
    .then(models => {
      const index = Math.floor(Math.random() * models.length);
      document.getElementById('modelText').textContent = models[index];
    });
});