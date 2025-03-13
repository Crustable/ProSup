
// Article page JavaScript for Documentation Portal

// Function to go back to previous page
function goBack() {
    window.history.back();
}

document.addEventListener('DOMContentLoaded', function() {
    // Get article slug from URL
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');

    if (!slug) {
        window.location.href = 'index.html';
        return;
    }

    const article = DataStore.getArticleBySlug(slug);
    if (!article) {
        window.location.href = 'index.html';
        return;
    }

    // Set article title and content
    document.title = `${article.title} - Documentation Portal`;
    document.getElementById('article-title').textContent = article.title;
    document.getElementById('article-title-header').textContent = article.title;

    // Get article content
    let content = article.content;
    
    // For articles that are not MXBus, remove any MXBus-specific image references
    if (slug !== 'mxbus-app-guide') {
        // Remove any MXBus-specific image references or setup instructions
        content = content.replace(/<div class="setup-steps">[\s\S]*?<\/div>/g, '');
        content = content.replace(/<div class="setup-step">[\s\S]*?<\/div>/g, '');
        content = content.replace(/<div class="mxbus-setup">[\s\S]*?<\/div>/g, '');
        content = content.replace(/<div class="app-download">[\s\S]*?<\/div>/g, '');
        content = content.replace(/<h2>MXBus Setup Steps<\/h2>/g, '');
        content = content.replace(/<h3>Download from App Store<\/h3>/g, '');
    }

    // Get article content and populate it
    const articleContentElement = document.getElementById('article-content');
    articleContentElement.innerHTML = content;

    // Check if this is the MXBus app guide and add setup images only if it is
    if (slug === 'mxbus-app-guide') {
        // Create MXBus specific content
        const mxbusSetupDiv = document.createElement('div');
        mxbusSetupDiv.className = 'mxbus-setup';
        mxbusSetupDiv.innerHTML = `
            <h2>MXBus Setup Steps</h2>
            <div class="setup-steps">
                <div class="setup-step">
                    <div class="setup-icon">📱</div>
                    <div class="setup-info">
                        <h3>Initial Setup</h3>
                        <p>Open the app and allow necessary permissions</p>
                    </div>
                </div>
                <div class="setup-step">
                    <div class="setup-icon">🔄</div>
                    <div class="setup-info">
                        <h3>Network Configuration</h3>
                        <p>Connect to the same network as your audio system</p>
                    </div>
                </div>
            </div>
            <div class="app-download">
                <h3>Download from App Store</h3>
                <a href="https://apps.apple.com/us/app/mxbus/id1530411157" target="_blank" class="button">Download MXBus App</a>
            </div>
        `;

        // Insert MXBus content at the beginning of the article content
        articleContentElement.insertBefore(mxbusSetupDiv, articleContentElement.firstChild);
    }

    // Get category for breadcrumb
    const category = DataStore.getCategoryById(article.categoryId);
    document.getElementById('category-link').textContent = category.name;
    document.getElementById('category-link').href = `category.html?id=${category.id}`;
});
