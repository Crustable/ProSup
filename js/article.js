
// Article page JavaScript for Documentation Portal

document.addEventListener('DOMContentLoaded', function() {
  // Get the article slug from the URL
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  
  if (!slug) {
    window.location.href = 'index.html';
    return;
  }
  
  // Load and display the article
  loadArticle(slug);
});

function loadArticle(slug) {
  const article = DataStore.getArticleBySlug(slug);
  
  if (!article) {
    window.location.href = 'index.html';
    return;
  }
  
  // Get the category
  const category = DataStore.getCategoryById(article.categoryId);
  
  // Update page title and breadcrumbs
  document.title = `${article.title} - Documentation Portal`;
  document.getElementById('article-title').textContent = article.title;
  document.getElementById('article-title-header').textContent = article.title;
  
  // Update category breadcrumb
  const categoryLink = document.getElementById('category-link');
  categoryLink.textContent = category.name;
  categoryLink.href = `category.html?slug=${category.slug}`;
  
  // Display article content
  document.getElementById('article-content').innerHTML = article.content;
}
