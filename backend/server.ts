import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeDatabase } from './db';
import routes from './routes';

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '10000');
const isProduction = process.env.NODE_ENV === 'production';

// Middleware
app.use(cors({
  origin: isProduction ? 'https://yourdomain.com' : '*'
}));
app.use(express.json());
app.use(morgan(isProduction ? 'combined' : 'dev'));

// Database
initializeDatabase()
  .then(() => console.log('✓ Database connected'))
  .catch(err => {
    console.error('✗ Database connection failed:', err);
    process.exit(1);
  });

// API Routes
app.use('/api', routes);

// Static Files
const staticPath = path.join(__dirname, '../client/dist');
app.use(express.static(staticPath, {
  maxAge: isProduction ? '1y' : '0'
}));

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    time: new Date().toISOString()
  });
});

// SPA Fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

// Error Handling
app.use((err: any, req, res, next) => {
  console.error(`[${new Date().toISOString()}]`, err);
  res.status(500).json({
    error: isProduction ? 'Internal Server Error' : err.message
  });
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
  ==============================
  🚀 Server running on port ${PORT}
  📁 Static files from: ${staticPath}
  ==============================
  `);
});
