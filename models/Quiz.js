const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: String,
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }
});

module.exports = mongoose.model('Quiz', QuizSchema);
