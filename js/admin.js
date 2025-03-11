
// Admin page JavaScript for Documentation Portal

document.addEventListener('DOMContentLoaded', function() {
  // Load and display tickets
  loadTickets();
});

function loadTickets() {
  const ticketsContainer = document.getElementById('tickets-list');
  const noTicketsMessage = document.getElementById('no-tickets');
  const tickets = DataStore.getTickets();
  
  // Clear tickets list
  ticketsContainer.innerHTML = '';
  
  if (tickets.length === 0) {
    noTicketsMessage.style.display = 'block';
    return;
  }
  
  noTicketsMessage.style.display = 'none';
  
  // Sort tickets by creation date (newest first)
  tickets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  // Display each ticket
  tickets.forEach(ticket => {
    const row = document.createElement('tr');
    
    // Format the date
    const createdDate = new Date(ticket.createdAt);
    const formattedDate = createdDate.toLocaleDateString() + ' ' + createdDate.toLocaleTimeString();
    
    row.innerHTML = `
      <td>${ticket.id}</td>
      <td>${ticket.email}</td>
      <td>${ticket.subject}</td>
      <td><span class="status-${ticket.status}">${ticket.status}</span></td>
      <td>${formattedDate}</td>
      <td>
        ${ticket.status === 'open' ? 
          `<button class="button" onclick="closeTicket(${ticket.id})">Close</button>` : 
          `<button class="button" onclick="reopenTicket(${ticket.id})">Reopen</button>`
        }
      </td>
    `;
    
    ticketsContainer.appendChild(row);
  });
}

function closeTicket(id) {
  updateTicketStatus(id, 'closed');
}

function reopenTicket(id) {
  updateTicketStatus(id, 'open');
}

function updateTicketStatus(id, status) {
  try {
    DataStore.updateTicketStatus(id, status);
    loadTickets(); // Reload tickets to reflect changes
  } catch (error) {
    alert('Failed to update ticket status. Please try again.');
    console.error('Error updating ticket status:', error);
  }
}
