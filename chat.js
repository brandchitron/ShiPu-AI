document.getElementById('sendButton').addEventListener('click', function() {
    sendMessage();
});

document.getElementById('userInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    if (userInput.trim() === '') return;

    addMessageToChatBox('You: ' + userInput, 'userMessage');

    fetchBotResponse(userInput);

    document.getElementById('userInput').value = '';
}

function addMessageToChatBox(message, className) {
    const chatBox = document.getElementById('chatBox');
    const messageElement = document.createElement('div');
    messageElement.className = 'message ' + className;
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function fetchBotResponse(message) {
    const apiKey = '67b319ce65e7';
    const apiUrl = `https://c-v1.onrender.com/c/v1?message=${encodeURIComponent(message)}&model=ShiPu%20Bot&apiKey=${apiKey}&userId=1`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const botResponse = data.response; // Assuming the response comes in this format
            addMessageToChatBox('ShiPu Bot: ' + botResponse, 'botMessage');
        })
        .catch(error => {
            console.error('Error:', error);
            addMessageToChatBox('ShiPu Bot: Sorry, something went wrong.', 'botMessage');
        });
}
