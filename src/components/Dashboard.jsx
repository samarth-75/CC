import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Trophy, 
  Target, 
  Star, 
  TrendingUp, 
  Users, 
  Clock,
  Zap,
  Award
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    { 
      label: 'Total XP', 
      value: user?.xp || 0, 
      icon: Star, 
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/20'
    },
    { 
      label: 'Current Level', 
      value: user?.level || 1, 
      icon: TrendingUp, 
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/20'
    },
    { 
      label: 'Challenges Completed', 
      value: user?.completedChallenges?.length || 0, 
      icon: Target, 
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-400/20'
    },
    { 
      label: 'Badges Earned', 
      value: user?.badges?.length || 0, 
      icon: Award, 
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/20'
    }
  ];

  const recentActivity = [
    { action: 'Completed JavaScript Fundamentals', time: '2 hours ago', xp: 50 },
    { action: 'Won Arena Battle vs CodeNinja', time: '1 day ago', xp: 100 },
    { action: 'Earned "Bug Hunter" Badge', time: '3 days ago', xp: 75 },
  ];

  const upcomingChallenges = [
    { title: 'React Components Battle', difficulty: 'Medium', participants: 124, startTime: 'Today 8:00 PM' },
    { title: 'Algorithm Speed Run', difficulty: 'Hard', participants: 89, startTime: 'Tomorrow 2:00 PM' },
    { title: 'CSS Layout Challenge', difficulty: 'Easy', participants: 67, startTime: 'Friday 6:00 PM' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-2">
            Welcome back, {user?.username}!
          </h1>
          <p className="text-gray-300 text-lg">
            Ready to level up your coding skills today?
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <span className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </span>
              </div>
              <h3 className="text-gray-300 font-medium">{stat.label}</h3>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Clock className="h-6 w-6 text-purple-400" />
              <h2 className="text-xl font-bold text-white">Recent Activity</h2>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{activity.action}</p>
                    <p className="text-gray-400 text-sm">{activity.time}</p>
                  </div>
                  <div className="flex items-center space-x-1 text-yellow-400">
                    <Zap className="h-4 w-4" />
                    <span className="font-bold">+{activity.xp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Challenges */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Trophy className="h-6 w-6 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">Upcoming Challenges</h2>
            </div>
            <div className="space-y-4">
              {upcomingChallenges.map((challenge, index) => (
                <div key={index} className="p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">{challenge.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      challenge.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                      challenge.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{challenge.participants} participants</span>
                    </div>
                    <span>{challenge.startTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="mt-8 bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Level Progress</h2>
            <span className="text-purple-400 font-bold">Level {user?.level}</span>
          </div>
          <div className="relative">
            <div className="w-full bg-slate-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-500 to-cyan-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${((user?.xp || 0) % 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-400">
              <span>{user?.xp || 0} XP</span>
              <span>{Math.floor((user?.level || 1) * 100)} XP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;