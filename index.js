import express from 'express';
import mongoose from 'mongoose';
// Importing environment variables
import dotenv from 'dotenv';
import eventRouter from './routes/eventRouter.js';
dotenv.config();

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/event',eventRouter);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
