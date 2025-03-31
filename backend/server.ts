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

// ==============
// Configuration
// ==============
app.use(cors({
  origin: isProduction ? 'https://your-production-domain.com' : '*',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(isProduction ? 
  morgan('combined') : 
  morgan('dev')
);

// ==============
// Database
// ==============
initializeDatabase()
  .then(() => console.log('✓ Database connected'))
  .catch(err => {
    console.error('✗ Database connection failed:', err);
    process.exit(1);
  });

// ==============
// Routes
// ==============
app.use('/api', routes);

// ==============
// Static Files
// ==============
const staticPath = path.join(__dirname, isProduction ? '../client/dist' : '../dist/client');
app.use(express.static(staticPath, {
  maxAge: isProduction ? '1y' : '0',
  etag: true,
  index: false
}));

// ==============
// Health Check
// ==============
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    time: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// ==============
// SPA Fallback
// ==============
app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'), {
    headers: {
      'Cache-Control': isProduction ? 'max-age=86400' : 'no-cache'
    }
  });
});

// ==============
// Error Handling
// ==============
app.use((err: any, req, res, next) => {
  console.error(`[${new Date().toISOString()}]`, err);
  
  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: err.message,
      ...(!isProduction && { stack: err.stack })
    }
  });
});

// ==============
// Server Start
// ==============
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
  ==================================
  Server started on port ${PORT}
  Mode: ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'}
  ==================================
  `);
});
