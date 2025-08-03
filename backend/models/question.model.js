import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  type: { 
    type: String, 
    enum: ['multiple_choice', 'match_pairs', 'fill_blank', 'speaking', 'find_mistakes'],
    required: true 
  },
  questionText: { type: String, required: true },
  order: { type: Number, default: 0 },

  imageUrl: String,
  audioUrl: String,
  videoUrl: String,

  options: [{
    text: String,
    imageUrl: String,
    isCorrect: Boolean
  }],

  pairs: [{
    leftText: String,
    leftImageUrl: String,
    rightText: String,
    rightImageUrl: String
  }],

  blanks: {
    sentence: String,
    correctWord: String,
    options: [String]
  },

  expectedAnswers: [String],

  xp: { type: Number, default: 10 },
  hint: String,
  explanation: String
}, { timestamps: true });

export default mongoose.model('Question', questionSchema);
