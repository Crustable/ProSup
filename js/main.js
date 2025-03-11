
// Main page JavaScript for Documentation Portal

document.addEventListener('DOMContentLoaded', function() {
  // Load and display categories
  loadCategories();
});

function loadCategories() {
  const categoriesContainer = document.getElementById('categories-container');
  const categories = DataStore.getCategories();
  
  // Clear loading message
  categoriesContainer.innerHTML = '';
  
  if (categories.length === 0) {
    categoriesContainer.innerHTML = '<p>No categories found.</p>';
    return;
  }
  
  // Display each category
  categories.forEach(category => {
    const categoryCard = document.createElement('div');
    categoryCard.className = 'category-card';
    categoryCard.innerHTML = `
      <a href="category.html?slug=${category.slug}">
        <h2>${category.name}</h2>
        <p>${category.description}</p>
      </a>
    `;
    categoriesContainer.appendChild(categoryCard);
  });
}
