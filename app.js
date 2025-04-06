import express from 'express';
import http from 'http';
import { Server } from 'socket.io'; // ✅
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import gameRoutes from './routes/gameRoutes.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

// ✅ only declare io once
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/games', gameRoutes);

// DB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Sockets
io.on('connection', (socket) => {
  console.log('🔥 Socket connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('❌ Socket disconnected:', socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
