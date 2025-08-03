import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  levelRequired: { type: Number, default: 1 },
  xpReward: { type: Number, default: 50 },

  order: { type: Number, default: 0 },

  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }]
}, { timestamps: true });

export default mongoose.model('Module', moduleSchema);
