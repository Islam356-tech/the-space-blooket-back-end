import express, { response } from 'express';
import cors from 'cors';
import router from './routes/auth.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

const app = express();

// Allow CORS for specific origin (localhost:3000 in this case)
app.use(cors({
    origin: 'http://localhost:3000', // Allow frontend running on localhost:3000
    methods: ['POST'],
    credentials: true  // Allow cookies if needed
}));  
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ MongoDB Connected!");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};
app.use('/api/auth', (req, res) => {
  res.send('Auth route working!');
});
connectDB();
app.use(express.json());  // For parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', router);  // Your auth routes
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));