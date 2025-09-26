import React from 'react';
import { Sword, Play, Zap } from 'lucide-react';

const Arena = () => {
  // All battles are 1v1 (maxPlayers: 2)
  const availableMatches = [
    {
      id: 1,
      title: 'React Components Battle',
      requiredLevel: 4,
      maxPlayers: 2,
      currentPlayers: 2,
      reward: 120,
    },
    {
      id: 2,
      title: 'Algorithm Speed Run',
      requiredLevel: 6,
      maxPlayers: 2,
      currentPlayers: 2,
      reward: 200,
    },
    {
      id: 3,
      title: 'CSS Layout Challenge',
      requiredLevel: 5,
      maxPlayers: 2,
      currentPlayers: 1,
      reward: 150,
    },
    {
      id: 4,
      title: 'JavaScript Quiz Battle',
      requiredLevel: 3,
      maxPlayers: 2,
      currentPlayers: 2,
      reward: 100,
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Sword className="h-8 w-8 text-red-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
              Battle Arena
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            Test your coding skills in real-time 1v1 battles against other developers
          </p>
        </div>

        {/* Join a Battle */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
            <Play className="h-6 w-6 text-green-400" />
            <span>Join a Battle</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {availableMatches.map(match => (
              <div key={match.id} className="bg-slate-800/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:border-green-500/40 transition-all">
                <h3 className="text-xl font-bold text-white mb-4">{match.title}</h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Required Level:</span>
                    <span className="text-cyan-400 font-bold">Level {match.requiredLevel}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Players:</span>
                    <span className="text-white">{match.currentPlayers}/2</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Reward:</span>
                    <div className="flex items-center space-x-1 text-yellow-400">
                      <Zap className="h-4 w-4" />
                      <span className="font-bold">{match.reward} XP</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 text-white py-2 px-4 rounded-lg transition-all font-medium">
                  Join Battle
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Arena;