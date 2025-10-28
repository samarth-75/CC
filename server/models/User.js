import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true, minlength: 3, maxlength: 20 },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  profilePicture: { type: String, default: '' },
  skills: { type: [String], default: [] },
  projects: [{
  name: { type: String, required: true },
  github: { type: String, required: true },
  description: { type: String, maxlength: 250 }
  }],
  completedChallenges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' }],
  badges: [String],
  joinedAt: { type: Date, default: Date.now }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.pre('save', function(next) {
  this.level = Math.floor(this.xp / 100);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.calculateLevel = function() {
  this.level = Math.floor(this.xp / 100) + 1;
  return this.level;
};

userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

export default mongoose.model('User', userSchema);