import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeDatabase } from './db'; // Your DB setup
import routes from './routes'; // Your API routes

// Configure __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '10000');

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Database connection
initializeDatabase();

// API Routes
app.use('/api', routes);

// Serve static files from Vite build
app.use(express.static(path.join(__dirname, 'dist/client')));

// Health check endpoint (required for Render)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// SPA Fallback - must come after API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/client/index.html'));
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
