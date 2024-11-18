// server.js (backend)

import jsonServer from 'json-server';  // Use ES module import
import cors from 'cors';  // Use ES module import

const server = jsonServer.create();
const router = jsonServer.router('db.json');  // Path to your db.json
const middlewares = jsonServer.defaults();

// Enable CORS
server.use(cors());  // This enables CORS for all routes
server.use(middlewares);

// Use the router with your db.json file
server.use(router);

// Start the server on port 5000
server.listen(5000, () => {
  console.log('JSON Server is running on http://localhost:3000');
});
