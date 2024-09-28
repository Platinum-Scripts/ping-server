// BunJS Server: ping-server.js
import { serve } from 'bun';

const server = serve({
  fetch(request) {
    // Return the current timestamp as a response
    return new Response(Date.now().toString());
  },
  port: 80, // Set port to 80
});

console.log(`Server running on http://localhost:${server.port}`);