import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import fileRoutes from './routes/files';
import { mongoUrl } from './common/configuration';

const app = express();
const PORT = 2000;

// starting express server
app.use(cors());
app.use(express.json());
// Serve static files from the uploads directory.
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Use our file routes.
app.use('/', fileRoutes);

// connecting with mongoDB
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
