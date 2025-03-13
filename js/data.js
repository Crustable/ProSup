// Data handling module for Documentation Portal
// Uses localStorage to store and retrieve data

const DataStore = {
  // Initialize the data store with sample data if empty
  init: function() {
    // Check if data exists in localStorage
    if (!localStorage.getItem('categories')) {
      // Sample categories data
      const sampleCategories = [
        {
          id: 1,
          name: 'Audio',
          slug: 'audio',
          description: 'Documentation for audio equipment and techniques.'
        },
        {
          id: 2,
          name: 'Lighting',
          slug: 'lighting',
          description: 'Documentation for lighting equipment and setups.'
        },
        {
          id: 3,
          name: 'Production Video',
          slug: 'production-video',
          description: 'Documentation for video production equipment and workflows.'
        }
      ];
      localStorage.setItem('categories', JSON.stringify(sampleCategories));
    }

    if (!localStorage.getItem('articles')) {
      // Sample articles data
      const sampleArticles = [
        {
          id: 1,
          categoryId: 1,
          title: 'Introduction to Microphones',
          slug: 'intro-to-microphones',
          content: '<h2>Introduction to Microphones</h2><p>Microphones are devices that convert sound into electrical signals. They are essential tools in audio recording, live sound reinforcement, and broadcasting.</p><h3>Types of Microphones</h3><p>There are several types of microphones used in professional audio settings:</p><ul><li><strong>Dynamic Microphones:</strong> Robust and durable, great for live performances.</li><li><strong>Condenser Microphones:</strong> Sensitive and accurate, ideal for studio recording.</li><li><strong>Ribbon Microphones:</strong> Vintage sound character, often used for brass and vocals.</li></ul><p>Each microphone type has its own characteristics that make it suitable for different applications.</p>'
        },
        {
          id: 2,
          categoryId: 1,
          title: 'Audio Mixing Basics',
          slug: 'audio-mixing-basics',
          content: '<h2>Audio Mixing Basics</h2><p>Audio mixing is the process of combining multiple sound sources to create a balanced and cohesive final product.</p><p>The key aspects of mixing include:</p><ul><li>Volume balancing</li><li>Equalization (EQ)</li><li>Compression</li><li>Effects (reverb, delay, etc.)</li><li>Panning</li></ul><p>A well-mixed audio track ensures all elements can be heard clearly and work together harmoniously.</p>'
        },
        {
          id: 3,
          categoryId: 2,
          title: 'Stage Lighting Fundamentals',
          slug: 'stage-lighting-fundamentals',
          content: '<h2>Stage Lighting Fundamentals</h2><p>Stage lighting is essential for creating atmosphere and drawing attention to performers or elements on stage.</p><h3>Basic Lighting Concepts</h3><ul><li><strong>Front Light:</strong> Illuminates the performers from the audience perspective.</li><li><strong>Back Light:</strong> Creates silhouettes and depth.</li><li><strong>Side Light:</strong> Adds dimension and highlights body shapes.</li><li><strong>Color:</strong> Used to set mood and atmosphere.</li></ul><p>Properly designed lighting enhances the visual experience and supports the narrative of a performance.</p>'
        },
        {
          id: 4,
          categoryId: 3,
          title: 'Video Production Planning',
          slug: 'video-production-planning',
          content: '<h2>Video Production Planning</h2><p>Successful video production starts with thorough planning and pre-production.</p><h3>Key Planning Elements</h3><ol><li><strong>Script Development:</strong> Creating a detailed script that outlines dialogue, action, and transitions.</li><li><strong>Storyboarding:</strong> Visual representation of each shot in sequence.</li><li><strong>Shot List:</strong> Detailed list of every shot needed for production.</li><li><strong>Location Scouting:</strong> Finding and securing appropriate filming locations.</li><li><strong>Equipment List:</strong> Determining the cameras, lighting, and audio equipment needed.</li></ol><p>Comprehensive planning saves time and resources during the production phase and leads to a more polished final product.</p>'
        },
        {
          id: 5,
          categoryId: 1,
          title: 'MXBus App Guide',
          slug: 'mxbus-app-guide',
          content: '<h2>MXBus App Guide</h2><p>The MXBus app allows you to control your audio system from your mobile device. This guide will help you get started with the MXBus app.</p><h3>Features</h3><ul><li>Wireless control of your audio system</li><li>Real-time monitoring of audio levels</li><li>Save and load presets</li><li>Adjust EQ and effects</li></ul><p>For more information, visit the <a href="https://www.keldenich.net/en/MXBus/" target="_blank">MXBus website</a>.</p>'
        }
      ];
      localStorage.setItem('articles', JSON.stringify(sampleArticles));
    }

    if (!localStorage.getItem('tickets')) {
      // Initialize empty tickets array
      localStorage.setItem('tickets', JSON.stringify([]));
    }
  },

  // Categories methods
  getCategories: function() {
    return JSON.parse(localStorage.getItem('categories') || '[]');
  },

  getCategoryBySlug: function(slug) {
    const categories = this.getCategories();
    return categories.find(cat => cat.slug === slug);
  },

  getCategoryById: function(id) {
    const categories = this.getCategories();
    return categories.find(cat => cat.id === id);
  },

  // Articles methods
  getArticles: function(categoryId) {
    const articles = JSON.parse(localStorage.getItem('articles') || '[]');
    return categoryId ? articles.filter(article => article.categoryId === categoryId) : articles;
  },

  getArticleBySlug: function(slug) {
    const articles = this.getArticles();
    return articles.find(article => article.slug === slug);
  },

  // Tickets methods
  getTickets: function() {
    return JSON.parse(localStorage.getItem('tickets') || '[]');
  },

  createTicket: function(ticket) {
    const tickets = this.getTickets();
    const newTicket = {
      id: tickets.length > 0 ? Math.max(...tickets.map(t => t.id)) + 1 : 1,
      email: ticket.email,
      subject: ticket.subject,
      message: ticket.message,
      status: 'open',
      createdAt: new Date().toISOString()
    };

    tickets.push(newTicket);
    localStorage.setItem('tickets', JSON.stringify(tickets));
    return newTicket;
  },

  updateTicketStatus: function(id, status) {
    const tickets = this.getTickets();
    const ticketIndex = tickets.findIndex(t => t.id === id);

    if (ticketIndex !== -1) {
      tickets[ticketIndex].status = status;
      localStorage.setItem('tickets', JSON.stringify(tickets));
      return tickets[ticketIndex];
    }

    return null;
  }
};

// Navigation function for back button
function goBack() {
    window.history.back();
}

// Initialize the data store
DataStore.init();
