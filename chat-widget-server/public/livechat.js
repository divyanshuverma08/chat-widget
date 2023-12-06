// livechat.js

document.addEventListener("DOMContentLoaded", function () {
  const socket = io('https://chat-widget-g9pw.onrender.com'); //socket connection

  const chatButton = document.createElement('div');
  chatButton.id = 'chat-button';
  chatButton.innerHTML = '&#9993;'; // Mail logo in circular button

  document.body.appendChild(chatButton);

  //chat box widget open after clicking on chat button
  const chatWidget = document.createElement('div');
  chatWidget.id = 'chat-widget';
  chatWidget.innerHTML = `
    <div id="chat-header">
      <div id="header-text">Chat with Us</div>
      <div id="close-button">&#10006;</div>
    </div>
    <div id="chat-form">
      <form id="start-chat-form">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>

        <label for="phone">Phone Number:</label>
        <input type="tel" id="phone" name="phone" required>

        <button type="submit">Start Chat</button>
      </form>
    </div>
    <div id="message-section" style="display: none;">
      <div id="chat-messages"></div>
      <input type="text" id="message-input" placeholder="Type your message...">
      <button id="send-button">Send</button>
    </div>
  `;

  document.body.appendChild(chatWidget);

  chatWidget.style.display = 'none';

  chatButton.addEventListener('click', function () {
    chatButton.style.display = 'none';
    chatWidget.style.display = 'block';
  });

  document.getElementById('close-button').addEventListener('click', function () {
    chatWidget.style.display = 'none';
    chatButton.style.display = 'block';
  });

  const chatMessages = document.getElementById('chat-messages');
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');
  const startChatForm = document.getElementById('start-chat-form');
  const messageSection = document.getElementById('message-section');

  //socket listeners

  let messages = [];
  let userId = "";
  let chatId = "";

  //socket listener of chat start
  socket.on('chat initialized', (data) => {
    messages = [...data.messages];
    userId = data.userId;
    chatId = data.chatId;
    for (const entry of messages) {
      appendMessage(entry.createdBy === "user" ? "You" : "Support", entry.content, entry.createdBy);
    }
  });

  //socket listener for receiving chat messages
  socket.on('chat received', (msg) => {
    console.log("new chat",msg);
    appendMessage(msg.createdBy === "user" ? "You" : "Support", msg.message, msg.createdBy);
  });

  function appendMessage(user, message, sender) {
    const newMessage = document.createElement('div');
    newMessage.className = 'message';
    
    // Apply different styles based on the sender
    if (sender === 'system' || sender === "host") {
      newMessage.classList.add('system-message');
    } else if (sender === "user") {
      newMessage.classList.add('user-message');
    }

    newMessage.innerHTML = `<strong>${user}:</strong> ${message}`;
    chatMessages.appendChild(newMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function sendMessage() {
    const message = messageInput.value.trim();
    if (message !== '') {
      //Emit event for sending message to socket
      socket.emit('chat message', { message, userId: userId, chatId: chatId, sentBy: "user"});
      messageInput.value = '';
    }
  }

  //form for taking name, email and phone of user
  function startChat(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    appendMessage('System', `Welcome, ${name}! The chat will start shortly.`, 'system');

    //Emit event for starting chat
    socket.emit('start chat', { name, email, phone });
    
    // Hide the form and show the message input section
    chatWidget.removeChild(document.getElementById('chat-form'));
    messageSection.style.display = 'block';
  }

  sendButton.addEventListener('click', sendMessage);
  startChatForm.addEventListener('submit', startChat);
});
