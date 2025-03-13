
// Support page JavaScript for Documentation Portal

// Function to go back to previous page
function goBack() {
    window.history.back();
}

document.addEventListener('DOMContentLoaded', function() {
  // Set up support form submission
  const supportForm = document.getElementById('support-form');
  supportForm.addEventListener('submit', handleFormSubmit);
});

function handleFormSubmit(event) {
  event.preventDefault();
  
  // Get form data
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  
  // Create ticket
  try {
    DataStore.createTicket({
      email,
      subject,
      message
    });
    
    // Show success message
    showMessage('success', 'Your support ticket has been submitted successfully. We will get back to you soon.');
    
    // Clear the form
    document.getElementById('support-form').reset();
  } catch (error) {
    showMessage('error', 'Failed to submit the ticket. Please try again later.');
    console.error('Error submitting ticket:', error);
  }
}

function showMessage(type, message) {
  const messageElement = document.getElementById('form-message');
  messageElement.className = type === 'success' ? 'success-message' : 'error-message';
  messageElement.textContent = message;
  
  // Scroll to message
  messageElement.scrollIntoView({ behavior: 'smooth' });
  
  // Clear message after 5 seconds
  setTimeout(() => {
    messageElement.textContent = '';
    messageElement.className = '';
  }, 5000);
}
