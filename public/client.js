// When deployed, set BACKEND_URL to your Render service URL
// For local testing, leave as localhost:3000
const BACKEND_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000'
  : 'https://ligand-chatbot.onrender.com'; // Update with your deployed Render URL after deployment

const socket = io(BACKEND_URL);
const messages = document.getElementById('messages');
const text = document.getElementById('text');
const send = document.getElementById('send');

function addMessage(content, cls) {
  const el = document.createElement('div');
  el.className = 'msg ' + (cls || '');
  el.textContent = content;
  messages.appendChild(el);
  messages.scrollTop = messages.scrollHeight;
}

send.addEventListener('click', () => {
  const value = text.value.trim();
  if (!value) return;
  addMessage('You: ' + value, 'user');
  socket.emit('user_message', { text: value });
  text.value = '';
});

text.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') send.click();
});

socket.on('bot_typing', (v) => {
  if (v) addMessage('Bot is typing...', 'bot');
});

socket.on('bot_message', (payload) => {
  const str = payload?.text || JSON.stringify(payload);
  addMessage('Bot: ' + str, 'bot');
});
