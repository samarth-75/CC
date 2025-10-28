import mongoose from 'mongoose';

const battleSchema = new mongoose.Schema({
  roomId: String,
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
  submissions: [{
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    code: String,
    submittedAt: Date,
    passed: Boolean
  }],
  winner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, default: 'pending' }
}, { timestamps: true });

export default mongoose.model('Battle', battleSchema);