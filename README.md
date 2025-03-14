
# Documentation Portal

A static HTML/JavaScript documentation portal that can be hosted on GitHub Pages or any static hosting service.

## Features

- Browse categories of documentation
- Read articles
- Submit support tickets
- Admin panel to manage support tickets
- Client-side only (no server required)
- Data storage using browser localStorage

## Getting Started

1. Clone this repository
2. Open `index.html` in your browser
3. All data is stored in your browser's localStorage

## Deployment on GitHub Pages

1. Push this repository to GitHub
2. Go to repository Settings > Pages
3. Select the main branch as source
4. Your site will be available at https://yourusername.github.io/repository-name/

## Structure

- `index.html` - Main page
- `category.html` - Category view
- `article.html` - Article view
- `support.html` - Support ticket form
- `admin/tickets.html` - Admin ticket management
- `js/` - JavaScript files
  - `data.js` - Data storage module
  - `main.js` - Main page functionality
  - `category.js` - Category page functionality
  - `article.js` - Article page functionality
  - `support.js` - Support page functionality
  - `admin.js` - Admin page functionality
- `css/` - CSS files
  - `styles.css` - Main stylesheet

## License

MIT
