import { serve } from 'bun';
import { readFile } from 'fs/promises';
import { join } from 'path';

// Define the path for the HTML file
const htmlFilePath = join(import.meta.dir, 'index.html');

// Function to serve the HTML file
async function serveHtmlFile() {
  try {
    const fileContents = await readFile(htmlFilePath);
    return new Response(fileContents, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    return new Response('File not found', { status: 404 });
  }
}

// BunJS Server to serve ping data on '/' and HTML on '/test'
const server = serve({
  fetch(req) {
    const url = new URL(req.url);

    // Serve ping data when requesting the root path "/"
    if (url.pathname === '/') {
      return new Response(Date.now().toString(), {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // Serve the HTML file when requesting "/test"
    if (url.pathname === '/test') {
      return serveHtmlFile();
    }

    // Return 404 for any other routes
    return new Response('Not found', { status: 404 });
  },
  port: 80, // Set to port 80 for serving pings and HTML
});

console.log(`Server running at http://localhost`);