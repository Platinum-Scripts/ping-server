// BunJS Server: ping-server.js
import { serve } from 'bun';

const server = serve({
  fetch(request) {
    // Return the current timestamp as a response, including CORS headers
    return new Response(Date.now().toString(), {
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow requests from any origin
        "Access-Control-Allow-Methods": "GET", // Allow only GET requests
        "Access-Control-Allow-Headers": "Content-Type", // Specify allowed headers
      },
    });
  },
  port: 80, // Set port to 80
});

console.log(`Server running on http://localhost:${server.port}`);