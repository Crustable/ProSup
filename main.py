
import os
from flask import Flask, jsonify, request, send_from_directory, render_template
from flask_cors import CORS
import json
from datetime import datetime
import sqlite3
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)

# Database setup
def get_db_connection():
    conn = sqlite3.connect('knowledge_base.db')
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Create tables
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        description TEXT NOT NULL
    )
    ''')
    
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS articles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        content TEXT NOT NULL,
        FOREIGN KEY (category_id) REFERENCES categories (id)
    )
    ''')
    
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS tickets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'open',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    conn.commit()
    conn.close()

# Initialize the database
init_db()

# API Routes
@app.route('/api/categories', methods=['GET'])
def get_categories():
    conn = get_db_connection()
    categories = conn.execute('SELECT * FROM categories').fetchall()
    conn.close()
    
    # Convert to list of dictionaries
    result = [dict(row) for row in categories]
    return jsonify(result)

@app.route('/api/categories/<slug>', methods=['GET'])
def get_category_by_slug(slug):
    conn = get_db_connection()
    category = conn.execute('SELECT * FROM categories WHERE slug = ?', (slug,)).fetchone()
    conn.close()
    
    if not category:
        return jsonify({"message": "Category not found"}), 404
    
    return jsonify(dict(category))

@app.route('/api/categories/<int:id>/articles', methods=['GET'])
def get_articles_by_category(id):
    conn = get_db_connection()
    articles = conn.execute('SELECT * FROM articles WHERE category_id = ?', (id,)).fetchall()
    conn.close()
    
    # Convert to list of dictionaries
    result = [dict(row) for row in articles]
    return jsonify(result)

@app.route('/api/articles/<slug>', methods=['GET'])
def get_article_by_slug(slug):
    conn = get_db_connection()
    article = conn.execute('SELECT * FROM articles WHERE slug = ?', (slug,)).fetchone()
    conn.close()
    
    if not article:
        return jsonify({"message": "Article not found"}), 404
    
    return jsonify(dict(article))

@app.route('/api/tickets', methods=['GET'])
def get_tickets():
    conn = get_db_connection()
    tickets = conn.execute('SELECT * FROM tickets').fetchall()
    conn.close()
    
    # Convert to list of dictionaries
    result = [dict(row) for row in tickets]
    return jsonify(result)

@app.route('/api/tickets', methods=['POST'])
def create_ticket():
    try:
        data = request.json
        
        # Validate request data
        if not all(key in data for key in ['email', 'subject', 'message']):
            return jsonify({"message": "Invalid ticket data"}), 400
        
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            'INSERT INTO tickets (email, subject, message, status) VALUES (?, ?, ?, ?)',
            (data['email'], data['subject'], data['message'], 'open')
        )
        ticket_id = cursor.lastrowid
        conn.commit()
        
        # Fetch the created ticket
        ticket = conn.execute('SELECT * FROM tickets WHERE id = ?', (ticket_id,)).fetchone()
        conn.close()
        
        return jsonify(dict(ticket)), 201
    
    except Exception as e:
        logger.error(f"Error creating ticket: {str(e)}")
        return jsonify({"message": "Failed to create ticket"}), 500

@app.route('/api/tickets/<int:id>/status', methods=['PATCH'])
def update_ticket_status(id):
    try:
        data = request.json
        status = data.get('status')
        
        if not status:
            return jsonify({"message": "Status is required"}), 400
        
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('UPDATE tickets SET status = ? WHERE id = ?', (status, id))
        conn.commit()
        
        if cursor.rowcount == 0:
            conn.close()
            return jsonify({"message": "Ticket not found"}), 404
        
        # Fetch the updated ticket
        ticket = conn.execute('SELECT * FROM tickets WHERE id = ?', (id,)).fetchone()
        conn.close()
        
        return jsonify(dict(ticket))
    
    except Exception as e:
        logger.error(f"Error updating ticket status: {str(e)}")
        return jsonify({"message": "Failed to update ticket status"}), 500

# Frontend routes
@app.route('/')
def home():
    return render_template('index.html', page_title="Documentation Portal")

@app.route('/category/<slug>')
def category_page(slug):
    conn = get_db_connection()
    category = conn.execute('SELECT * FROM categories WHERE slug = ?', (slug,)).fetchone()
    
    if not category:
        conn.close()
        return render_template('not_found.html'), 404
    
    articles = conn.execute('SELECT * FROM articles WHERE category_id = ?', (category['id'],)).fetchall()
    conn.close()
    
    return render_template('category.html', category=dict(category), articles=[dict(a) for a in articles])

@app.route('/article/<slug>')
def article_page(slug):
    conn = get_db_connection()
    article = conn.execute('SELECT a.*, c.name as category_name, c.slug as category_slug FROM articles a JOIN categories c ON a.category_id = c.id WHERE a.slug = ?', (slug,)).fetchone()
    conn.close()
    
    if not article:
        return render_template('not_found.html'), 404
    
    return render_template('article.html', article=dict(article))

@app.route('/support')
def support_page():
    return render_template('support.html', page_title="Support")

@app.route('/admin/tickets')
def admin_tickets_page():
    conn = get_db_connection()
    tickets = conn.execute('SELECT * FROM tickets ORDER BY created_at DESC').fetchall()
    conn.close()
    
    return render_template('admin_tickets.html', tickets=[dict(t) for t in tickets])

# Request logging middleware
@app.before_request
def log_request_info():
    if request.path.startswith('/api'):
        logger.info(f"{request.method} {request.path}")

@app.after_request
def log_response_info(response):
    if request.path.startswith('/api'):
        logger.info(f"{request.method} {request.path} {response.status_code}")
    return response

# Error handlers
@app.errorhandler(404)
def page_not_found(e):
    return render_template('not_found.html'), 404

@app.errorhandler(500)
def server_error(e):
    return render_template('error.html', error=str(e)), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
