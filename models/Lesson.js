const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  category: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lesson', LessonSchema);
