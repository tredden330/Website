const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);

// Serve static files from the "public" folder
app.use(express.static('public'));

// Create a WebSocket server by passing the HTTP server instance
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('WebSocket connected');

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    // Process the received message and send a response if needed
  });

  ws.on('close', () => {
    console.log('WebSocket disconnected');
  });
});

server.listen(8080, () => {
  console.log('Server started on port 8080');
});

