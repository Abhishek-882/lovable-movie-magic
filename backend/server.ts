
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { initializeDatabase } from './db';
import routes from './routes';

const app = express();
const PORT = parseInt(process.env.PORT || '10000'); // Force numeric port
const HOST = '0.0.0.0'; // Explicit host binding

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Database connection
initializeDatabase();

// Routes
app.use('/api', routes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});
// Change the last lines to:
const HOST = process.env.HOST || '0.0.0.0'; // Explicit host binding
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 10000; // Force number type

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
