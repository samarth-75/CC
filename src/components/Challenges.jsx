import React, { useState, useEffect } from 'react';
import { Target, Star, Clock, Trophy, Code, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Challenges = () => {
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState([]);
  const { user } = useAuth();
  

  useEffect(() => {
    fetch('http://localhost:5000/api/challenges', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setChallenges(Array.isArray(data) ? data : []));
  }, []);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-400';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400';
      case 'Advanced': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  // Defensive helpers for missing fields
  const isCompleted = (challenge) =>
  user?.completedChallenges?.includes(challenge._id || challenge.id);
  const getTopics = (challenge) => Array.isArray(challenge.topics) ? challenge.topics : [];
  const getTimeEstimate = (challenge) => challenge.timeEstimate || '—';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Target className="h-8 w-8 text-cyan-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
              Coding Challenges
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            Level up your skills with structured learning challenges
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-green-400" />
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {Array.isArray(challenges) ? challenges.filter(isCompleted).length : 0}
                </h3>
                <p className="text-gray-400">Completed</p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 text-yellow-400" />
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {Array.isArray(challenges) ? challenges.filter(c => !isCompleted(c)).length : 0}
                </h3>
                <p className="text-gray-400">In Progress</p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <Trophy className="h-8 w-8 text-purple-400" />
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {Array.isArray(challenges)
                    ? challenges.filter(isCompleted).reduce((total, c) => total + (c.xpReward || 0), 0)
                    : 0}
                </h3>
                <p className="text-gray-400">Total XP Earned</p>
              </div>
            </div>
          </div>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.isArray(challenges) && challenges.map(challenge => (
            <div key={challenge._id || challenge.id} className={`bg-slate-800/50 backdrop-blur-sm border rounded-xl p-6 transition-all hover:scale-105 ${
              isCompleted(challenge)
                ? 'border-green-500/20 hover:border-green-500/40'
                : 'border-purple-500/20 hover:border-purple-500/40'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-white">{challenge.title}</h3>
                    {isCompleted(challenge) && (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    )}
                  </div>
                  <p className="text-gray-400 mb-3">{challenge.description}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${getDifficultyColor(challenge.difficulty)}`}>
                  {challenge.difficulty}
                </span>
                <div className="flex items-center space-x-1 text-yellow-400">
                  <Star className="h-4 w-4" />
                  <span className="font-bold">{challenge.xpReward} XP</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{getTimeEstimate(challenge)}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Topics covered:</p>
                <div className="flex flex-wrap gap-2">
                  {getTopics(challenge).map((topic, index) => (
                    <span key={index} className="bg-slate-700/50 text-cyan-300 px-2 py-1 rounded text-sm">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <button
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                  isCompleted(challenge)
                    ? 'bg-green-600/20 text-green-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white transform hover:scale-105'
                }`}
                disabled={isCompleted(challenge)}
                onClick={() => {
                  if (!isCompleted(challenge)) {
                    navigate(`/challenges/${challenge._id || challenge.id}`);
                  }
                }}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Code className="h-5 w-5" />
                  <span>{isCompleted(challenge) ? 'Completed' : 'Start Challenge'}</span>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Challenges;