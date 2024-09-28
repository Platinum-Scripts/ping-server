// BunJS Server: ping-server.js
import { serve } from "bun";

const server = serve({
  fetch(request) {
    // Return the current timestamp as a response
    return new Response(Date.now().toString());
  },
  port: 8080, // Adjust port if necessary
});

console.log(`Server running on http://localhost:${server.port}`);