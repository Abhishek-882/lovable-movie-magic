import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

// Serve frontend files
app.use(express.static(path.join(__dirname, '../../../frontend/dist')));

// API routes would go here
app.get('/api', (req, res) => {
  res.json({ message: "Hello from backend" });
});

// Health check
app.get('/health', (req, res) => {
  res.sendStatus(200);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
