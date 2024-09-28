// BunJS Server: index.js
import { serve, WebSocketServer } from 'bun';

// WebSocket and HTTP Ping Server on the same port 8080
const server = serve({
  fetch(request) {
    // Return the current timestamp as a response for HTTP pings
    return new Response(Date.now().toString(), {
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow requests from any origin
        "Access-Control-Allow-Methods": "GET", // Allow only GET requests
        "Access-Control-Allow-Headers": "Content-Type", // Specify allowed headers
      },
    });
  },
  websocket: {
    message(ws, message) {
      const startTime = Date.now();
      // When receiving a ping message, respond with the current timestamp
      if (message === 'ping') {
        ws.send(JSON.stringify({ timestamp: startTime }));
      }
    },
  },
  port: 8080, // Both HTTP and WebSocket will run on port 8080
});

console.log(`Server running on http://localhost:${server.port} for HTTP and WS`);
