import React, { useState, useEffect } from 'react';
import { Trophy, Crown, Medal, Star, TrendingUp, User } from 'lucide-react';

const Leaderboard = () => {
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    topXP: 0,
    highestLevel: 0,
    activePlayers: 0,
    bestStreak: 0
  });

  

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  // ...existing code...
// ...existing code...
const fetchLeaderboard = async () => {
  try {
    setLoading(true);
    setError(null);

    // Use absolute URL during debugging if needed:
    // const response = await fetch('http://localhost:5000/api/leaderboard');
    const response = await fetch('/api/leaderboard');
    console.log('Leaderboard fetch status:', response.status, response.statusText);

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Failed to fetch leaderboard: ${response.status} ${text}`);
    }

    const data = await response.json();
    console.log('Leaderboard response JSON:', data);

    const users = Array.isArray(data.rankings) ? data.rankings : [];

    // Map users to UI shape, compute defaults
    const rankedUsers = users
      .map((u) => ({
        _id: u._id,
        username: u.username || 'Unknown',
        xp: typeof u.xp === 'number' ? u.xp : 0,
        level: u.level || Math.floor((u.xp || 0) / 100) || 1,
        badges: Array.isArray(u.badges) ? u.badges.length : 0,
        profilePicture: u.profilePicture || '',
        avatar: getDefaultAvatar(0), // will be replaced per index below
        streak: 0, // placeholder if you track streaks later
      }))
      .sort((a, b) => b.xp - a.xp)
      .map((u, idx) => ({ ...u, rank: idx + 1, avatar: getDefaultAvatar(idx) }));

    setTopUsers(rankedUsers);

    // update stats
    setStats({
      topXP: rankedUsers.length ? rankedUsers[0].xp : 0,
      highestLevel: rankedUsers.length ? Math.max(...rankedUsers.map(r => r.level)) : 0,
      activePlayers: rankedUsers.length,
      bestStreak: 0
    });

    setLoading(false);
    console.log('Mapped leaderboard users:', rankedUsers);
  } catch (err) {
    console.error('Error fetching leaderboard:', err);
    setError(err.message || 'Failed to fetch leaderboard');
    setTopUsers([]);
    setLoading(false);
  }
};
// ...existing code...
  const getDefaultAvatar = (index) => {
    const avatars = ['🏆', '🥷', '🧙', '🐍', '⚛️', '⚡', '⚔️', '🐲', '🦄', '🚀'];
    return avatars[index % avatars.length];
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Crown className="h-6 w-6 text-yellow-400" />;
      case 2: return <Medal className="h-6 w-6 text-gray-300" />;
      case 3: return <Medal className="h-6 w-6 text-orange-400" />;
      default: return <span className="text-gray-400 font-bold">#{rank}</span>;
    }
  };

  const getRankBg = (rank) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/40';
      case 2: return 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/40';
      case 3: return 'bg-gradient-to-r from-orange-400/20 to-red-500/20 border-orange-400/40';
      default: return 'bg-slate-800/50 border-purple-500/20';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center bg-slate-800/50 backdrop-blur-sm border border-red-500/20 rounded-xl p-8">
          <p className="text-red-400 text-xl mb-4">{error}</p>
          <button 
            onClick={fetchLeaderboard}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (topUsers.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-white text-xl">No users yet. Be the first to join!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Trophy className="h-8 w-8 text-yellow-400" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                Leaderboard
              </h1>
            </div>
            <button 
              onClick={fetchLeaderboard}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition flex items-center space-x-2"
            >
              <TrendingUp className="h-4 w-4" />
              <span>Refresh</span>
            </button>
          </div>
          <p className="text-gray-300 text-lg">
            See how you stack up against the best developers in CodeCrafters
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <Crown className="h-8 w-8 text-yellow-400" />
              <div>
                <h3 className="text-2xl font-bold text-white">{stats.topXP.toLocaleString()}</h3>
                <p className="text-gray-400">Top XP</p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-purple-400" />
              <div>
                <h3 className="text-2xl font-bold text-white">{stats.highestLevel}</h3>
                <p className="text-gray-400">Highest Level</p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <User className="h-8 w-8 text-cyan-400" />
              <div>
                <h3 className="text-2xl font-bold text-white">{stats.activePlayers}</h3>
                <p className="text-gray-400">Active Players</p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-orange-500/20 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <Star className="h-8 w-8 text-orange-400" />
              <div>
                <h3 className="text-2xl font-bold text-white">{stats.bestStreak}</h3>
                <p className="text-gray-400">Best Streak</p>
              </div>
            </div>
          </div>
        </div>

        {topUsers.length >= 3 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Top Performers</h2>
            <div className="flex justify-center items-end space-x-8">
              <div className="text-center">
                <div className="bg-slate-800/50 border border-gray-400/40 rounded-xl p-6 mb-4 transform hover:scale-105 transition-all">
                  <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                    {topUsers[1].profilePicture ? (
                      <img src={topUsers[1].profilePicture} alt={topUsers[1].username} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl">{topUsers[1].avatar}</span>
                    )}
                  </div>
                  <Medal className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                  <h3 className="font-bold text-white">{topUsers[1].username}</h3>
                  <p className="text-gray-400">Level {topUsers[1].level}</p>
                  <p className="text-yellow-400 font-bold">{topUsers[1].xp.toLocaleString()} XP</p>
                </div>
                <div className="bg-gray-400/20 h-20 rounded-t-lg"></div>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/40 rounded-xl p-8 mb-4 transform hover:scale-105 transition-all">
                  <div className="w-20 h-20 mx-auto mb-2 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                    {topUsers[0].profilePicture ? (
                      <img src={topUsers[0].profilePicture} alt={topUsers[0].username} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-5xl">{topUsers[0].avatar}</span>
                    )}
                  </div>
                  <Crown className="h-10 w-10 text-yellow-400 mx-auto mb-2" />
                  <h3 className="font-bold text-white text-lg">{topUsers[0].username}</h3>
                  <p className="text-gray-300">Level {topUsers[0].level}</p>
                  <p className="text-yellow-400 font-bold text-lg">{topUsers[0].xp.toLocaleString()} XP</p>
                </div>
                <div className="bg-gradient-to-t from-yellow-500/20 to-yellow-400/30 h-32 rounded-t-lg"></div>
              </div>

              <div className="text-center">
                <div className="bg-slate-800/50 border border-orange-400/40 rounded-xl p-6 mb-4 transform hover:scale-105 transition-all">
                  <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                    {topUsers[2].profilePicture ? (
                      <img src={topUsers[2].profilePicture} alt={topUsers[2].username} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl">{topUsers[2].avatar}</span>
                    )}
                  </div>
                  <Medal className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                  <h3 className="font-bold text-white">{topUsers[2].username}</h3>
                  <p className="text-gray-400">Level {topUsers[2].level}</p>
                  <p className="text-yellow-400 font-bold">{topUsers[2].xp.toLocaleString()} XP</p>
                </div>
                <div className="bg-orange-400/20 h-16 rounded-t-lg"></div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden">
          <div className="p-6 bg-slate-700/50 border-b border-purple-500/20">
            <h2 className="text-xl font-bold text-white">Full Rankings</h2>
          </div>
          <div className="divide-y divide-slate-700/50">
            {topUsers.map((user) => (
              <div key={user.rank} className={`p-6 hover:bg-slate-700/30 transition-colors ${getRankBg(user.rank)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12">
                      {getRankIcon(user.rank)}
                    </div>
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                      {user.profilePicture ? (
                        <img src={user.profilePicture} alt={user.username} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-3xl">{user.avatar}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">{user.username}</h3>
                      <p className="text-gray-400">Level {user.level}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-8">
                    <div className="text-center">
                      <p className="text-yellow-400 font-bold text-lg">{user.xp.toLocaleString()}</p>
                      <p className="text-gray-400 text-sm">XP</p>
                    </div>
                    <div className="text-center">
                      <p className="text-purple-400 font-bold text-lg">{user.badges}</p>
                      <p className="text-gray-400 text-sm">Badges</p>
                    </div>
                    <div className="text-center">
                      <p className="text-orange-400 font-bold text-lg">{user.streak}</p>
                      <p className="text-gray-400 text-sm">Streak</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;