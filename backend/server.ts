import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

// Serve static files from frontend
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from backend' });
});

// All other routes handled by frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
