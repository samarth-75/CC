import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    console.log('--- /api/leaderboard debug ---');
    console.log('MONGODB_URI:', process.env.MONGODB_URI || 'no env var');
    console.log('mongoose.readyState:', mongoose.connection.readyState); // 1 = connected
    console.log('mongoose.db name:', mongoose.connection?.name);
    console.log('mongoose.host:', mongoose.connection?.host);
    console.log('mongoose.port:', mongoose.connection?.port);

    // model-level count
    const modelCount = await User.countDocuments().catch(e => {
      console.error('User.countDocuments error:', e.message);
      return null;
    });
    console.log('User.countDocuments():', modelCount);

    // raw collection count / sample from native driver
    let rawCount = null;
    let rawSample = null;
    if (mongoose.connection && mongoose.connection.db) {
      try {
        rawCount = await mongoose.connection.db.collection('users').countDocuments();
        rawSample = await mongoose.connection.db.collection('users').findOne({}, { projection: { username: 1, email: 1, xp: 1 } });
      } catch (e) {
        console.error('Raw collection access error:', e.message);
      }
    }
    console.log('raw collection count:', rawCount);
    console.log('raw collection sample:', rawSample);

    // normal users query (lean for plain objects)
    const users = await User.find({}).sort({ xp: -1 }).limit(50).select('username xp level badges profilePicture').lean();
    console.log('Queried users length:', Array.isArray(users) ? users.length : typeof users);

    return res.status(200).json({ message: 'Leaderboard debug', modelCount, rawCount, rawSample, rankings: users || [] });
  } catch (err) {
    console.error('Leaderboard route error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message, rankings: [] });
  }
});

export default router;