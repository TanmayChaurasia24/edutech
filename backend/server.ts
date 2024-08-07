import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import mongoconnect from './db.js';
import authRoutes from './routes/userRoutes.js'; // Ensure the path is correct

const PORT = 8000;

// Connect to the database
mongoconnect();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/user', authRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
