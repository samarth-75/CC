import React from 'react';
import { Trophy, Crown, Medal, Star, TrendingUp, User } from 'lucide-react';

const Leaderboard = () => {
  const topUsers = [
    {
      rank: 1,
      username: 'CodeMaster2024',
      level: 15,
      xp: 15420,
      badges: 8,
      streak: 45,
      avatar: '🏆'
    },
    {
      rank: 2,
      username: 'DevNinja',
      level: 14,
      xp: 14230,
      badges: 7,
      streak: 32,
      avatar: '🥷'
    },
    {
      rank: 3,
      username: 'JSWizard',
      level: 13,
      xp: 13890,
      badges: 6,
      streak: 28,
      avatar: '🧙'
    },
    {
      rank: 4,
      username: 'PythonPro',
      level: 13,
      xp: 13125,
      badges: 5,
      streak: 24,
      avatar: '🐍'
    },
    {
      rank: 5,
      username: 'ReactRocket',
      level: 12,
      xp: 12640,
      badges: 6,
      streak: 19,
      avatar: '⚛️'
    },
    {
      rank: 6,
      username: 'CppGuru',
      level: 12,
      xp: 12180,
      badges: 4,
      streak: 15,
      avatar: '⚡'
    },
    {
      rank: 7,
      username: 'WebWarrior',
      level: 11,
      xp: 11750,
      badges: 5,
      streak: 22,
      avatar: '⚔️'
    },
    {
      rank: 8,
      username: 'DataDragon',
      level: 11,
      xp: 11320,
      badges: 3,
      streak: 12,
      avatar: '🐲'
    }
  ];

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Trophy className="h-8 w-8 text-yellow-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
              Leaderboard
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            See how you stack up against the best developers in CodeCrafters
          </p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <Crown className="h-8 w-8 text-yellow-400" />
              <div>
                <h3 className="text-2xl font-bold text-white">{topUsers[0].xp.toLocaleString()}</h3>
                <p className="text-gray-400">Top XP</p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-purple-400" />
              <div>
                <h3 className="text-2xl font-bold text-white">{topUsers[0].level}</h3>
                <p className="text-gray-400">Highest Level</p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <User className="h-8 w-8 text-cyan-400" />
              <div>
                <h3 className="text-2xl font-bold text-white">{topUsers.length * 25}</h3>
                <p className="text-gray-400">Active Players</p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-orange-500/20 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <Star className="h-8 w-8 text-orange-400" />
              <div>
                <h3 className="text-2xl font-bold text-white">{topUsers[0].streak}</h3>
                <p className="text-gray-400">Best Streak</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Top Performers</h2>
          <div className="flex justify-center items-end space-x-8">
            {/* 2nd Place */}
            <div className="text-center">
              <div className="bg-slate-800/50 border border-gray-400/40 rounded-xl p-6 mb-4 transform hover:scale-105 transition-all">
                <div className="text-4xl mb-2">{topUsers[1].avatar}</div>
                <Medal className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                <h3 className="font-bold text-white">{topUsers[1].username}</h3>
                <p className="text-gray-400">Level {topUsers[1].level}</p>
                <p className="text-yellow-400 font-bold">{topUsers[1].xp.toLocaleString()} XP</p>
              </div>
              <div className="bg-gray-400/20 h-20 rounded-t-lg"></div>
            </div>

            {/* 1st Place */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/40 rounded-xl p-8 mb-4 transform hover:scale-105 transition-all">
                <div className="text-5xl mb-2">{topUsers[0].avatar}</div>
                <Crown className="h-10 w-10 text-yellow-400 mx-auto mb-2" />
                <h3 className="font-bold text-white text-lg">{topUsers[0].username}</h3>
                <p className="text-gray-300">Level {topUsers[0].level}</p>
                <p className="text-yellow-400 font-bold text-lg">{topUsers[0].xp.toLocaleString()} XP</p>
              </div>
              <div className="bg-gradient-to-t from-yellow-500/20 to-yellow-400/30 h-32 rounded-t-lg"></div>
            </div>

            {/* 3rd Place */}
            <div className="text-center">
              <div className="bg-slate-800/50 border border-orange-400/40 rounded-xl p-6 mb-4 transform hover:scale-105 transition-all">
                <div className="text-4xl mb-2">{topUsers[2].avatar}</div>
                <Medal className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                <h3 className="font-bold text-white">{topUsers[2].username}</h3>
                <p className="text-gray-400">Level {topUsers[2].level}</p>
                <p className="text-yellow-400 font-bold">{topUsers[2].xp.toLocaleString()} XP</p>
              </div>
              <div className="bg-orange-400/20 h-16 rounded-t-lg"></div>
            </div>
          </div>
        </div>

        {/* Full Leaderboard */}
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
                    <div className="text-3xl">{user.avatar}</div>
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