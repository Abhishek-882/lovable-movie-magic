import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeDatabase } from './db';
import routes from './routes';

// ES Modules __dirname polyfill
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '10000');
const isProduction = process.env.NODE_ENV === 'production';

// Middleware
app.use(cors({
  origin: isProduction ? ['https://your-production-domain.com'] : '*',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
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
const staticPath = path.resolve(__dirname, '../client/dist');
app.use(express.static(staticPath, {
  maxAge: isProduction ? '1y' : '0',
  etag: true,
  index: false
}));

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// SPA Fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'), {
    headers: {
      'Cache-Control': isProduction ? 'public, max-age=86400' : 'no-cache'
    }
  });
});

// Error Handling
app.use((err: any, req, res, next) => {
  console.error(`[${new Date().toISOString()}]`, err);
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      ...(!isProduction && { stack: err.stack })
    }
  });
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
  ==================================
  🚀 Server running on port ${PORT}
  📁 Serving static files from: ${staticPath}
  🚦 Environment: ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'}
  ==================================
  `);
});
