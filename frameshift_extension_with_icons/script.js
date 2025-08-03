document.addEventListener('DOMContentLoaded', () => {
  fetch('quotes.json')
    .then(res => res.json())
    .then(quotes => {
      const index = Math.floor(Math.random() * quotes.length);
      const selectedQuote = quotes[index];
      const modelElement = document.getElementById('modelText');
      
      // Create formatted mental model display with quote, model name, and category
      modelElement.innerHTML = `
        <div class="quote-text">"${selectedQuote.quote}"</div>
        <div class="quote-author">— ${selectedQuote.author}</div>
        <div class="quote-category">${selectedQuote.category}</div>
      `;
    })
    .catch(error => {
      console.error('Error loading quotes:', error);
      document.getElementById('modelText').textContent = 'Loading...';
    });
});