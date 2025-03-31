import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeDatabase } from './db';
import routes from './routes';

// Configure __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '10000');
const isProduction = process.env.NODE_ENV === 'production';

// ======================
// Middleware
// ======================
app.use(cors({
  origin: isProduction ? 'https://your-production-domain.com' : '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
if (!isProduction) {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// ======================
// Database Connection
// ======================
initializeDatabase()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

// ======================
// API Routes
// ======================
app.use('/api', routes);

// ======================
// Static Files (Vite Build)
// ======================
const staticDir = path.join(__dirname, isProduction ? '../dist/client' : '../client/dist');
app.use(express.static(staticDir, {
  maxAge: isProduction ? '1y' : '0',
  etag: true
}));

// ======================
// Health Check (for Render)
// ======================
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// ======================
// SPA Fallback Route
// ======================
app.get('*', (req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'));
});

// ======================
// Error Handling
// ======================
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(`[${new Date().toISOString()}] Error:`, err.stack);
  
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      ...(isProduction ? {} : { stack: err.stack })
    }
  });
});

// ======================
// Server Startup
// ======================
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
  ====================================
  🚀 Server running in ${isProduction ? 'production' : 'development'} mode
  ➡️  http://0.0.0.0:${PORT}
  ====================================
  `);
});
