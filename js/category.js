
// Category page JavaScript for Documentation Portal

document.addEventListener('DOMContentLoaded', function() {
  // Get the category slug from the URL
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  
  if (!slug) {
    window.location.href = 'index.html';
    return;
  }
  
  // Load and display category and its articles
  loadCategory(slug);
});

function loadCategory(slug) {
  const category = DataStore.getCategoryBySlug(slug);
  
  if (!category) {
    window.location.href = 'index.html';
    return;
  }
  
  // Update page title and header
  document.title = `${category.name} - Documentation Portal`;
  document.getElementById('category-name').textContent = category.name;
  document.querySelector('#category-header h1').textContent = category.name;
  document.getElementById('category-description').textContent = category.description;
  
  // Load articles
  loadArticles(category.id);
}

function loadArticles(categoryId) {
  const articlesContainer = document.getElementById('articles-container');
  const articles = DataStore.getArticles(categoryId);
  
  // Clear loading message
  articlesContainer.innerHTML = '';
  
  if (articles.length === 0) {
    articlesContainer.innerHTML = '<p>No articles found in this category.</p>';
    return;
  }
  
  // Display each article
  articles.forEach(article => {
    const articleCard = document.createElement('div');
    articleCard.className = 'article-card';
    articleCard.innerHTML = `
      <a href="article.html?slug=${article.slug}">
        <h3>${article.title}</h3>
        <p>Click to read more...</p>
      </a>
    `;
    articlesContainer.appendChild(articleCard);
  });
}
