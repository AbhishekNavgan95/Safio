import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },

  completedModules: [{
    moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Module' },
    completedAt: { type: Date, default: Date.now },
    attempts: [{
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
      attemptCount: { type: Number, default: 1 }
    }]
  }],

  parentalSettings: {
    parentalPassword: { type: String }, // hashed
    emailReportsEnabled: { type: Boolean, default: false }
  }
}, { timestamps: true });

export default mongoose.model('Profile', profileSchema);
