import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Mail, 
  Calendar, 
  Trophy, 
  Target, 
  Star, 
  Award,
  TrendingUp,
  Clock,
  Zap
} from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  const achievements = [
    { name: 'First Steps', description: 'Complete your first challenge', icon: '🎯', earned: true },
    { name: 'Speed Demon', description: 'Complete a challenge in under 30 minutes', icon: '⚡', earned: true },
    { name: 'Battle Winner', description: 'Win your first arena battle', icon: '⚔️', earned: false },
    { name: 'Streak Master', description: 'Maintain a 7-day coding streak', icon: '🔥', earned: false },
    { name: 'Knowledge Seeker', description: 'Complete 10 challenges', icon: '📚', earned: false },
    { name: 'Community Helper', description: 'Help 5 other developers', icon: '🤝', earned: false }
  ];

  const recentActivity = [
    { action: 'Completed JavaScript Fundamentals', date: '2 hours ago', xp: 50 },
    { action: 'Won Arena Battle vs CodeNinja', date: '1 day ago', xp: 100 },
    { action: 'Earned "Speed Demon" Badge', date: '2 days ago', xp: 75 },
    { action: 'Completed CSS Grid Challenge', date: '3 days ago', xp: 60 }
  ];

  const skillsProgress = [
    { skill: 'JavaScript', level: 8, progress: 80 },
    { skill: 'React', level: 6, progress: 60 },
    { skill: 'CSS', level: 7, progress: 70 },
    { skill: 'Node.js', level: 5, progress: 50 },
    { skill: 'Python', level: 4, progress: 40 }
  ];

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'from-green-500 to-emerald-500';
    if (progress >= 60) return 'from-yellow-500 to-orange-500';
    if (progress >= 40) return 'from-purple-500 to-pink-500';
    return 'from-red-500 to-pink-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                <User className="h-12 w-12 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-yellow-500 rounded-full p-2">
                <Star className="h-4 w-4 text-white" />
              </div>
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">{user?.username}</h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-300 mb-4">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(user?.joinedAt).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-purple-400" />
                  <span className="text-white font-bold">Level {user?.level}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  <span className="text-white font-bold">{user?.xp} XP</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-orange-400" />
                  <span className="text-white font-bold">{achievements.filter(a => a.earned).length} Badges</span>
                </div>
              </div>
            </div>
          </div>

          {/* Level Progress */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300">Progress to Level {(user?.level || 1) + 1}</span>
              <span className="text-purple-400 font-bold">{((user?.xp || 0) % 100)}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-500 to-cyan-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${((user?.xp || 0) % 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <Target className="h-8 w-8 text-cyan-400" />
              <div>
                <h3 className="text-2xl font-bold text-white">{user?.completedChallenges?.length || 0}</h3>
                <p className="text-gray-400">Challenges</p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <Trophy className="h-8 w-8 text-yellow-400" />
              <div>
                <h3 className="text-2xl font-bold text-white">0</h3>
                <p className="text-gray-400">Arena Wins</p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 text-orange-400" />
              <div>
                <h3 className="text-2xl font-bold text-white">0</h3>
                <p className="text-gray-400">Day Streak</p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <Star className="h-8 w-8 text-purple-400" />
              <div>
                <h3 className="text-2xl font-bold text-white">{user?.badges?.length || 0}</h3>
                <p className="text-gray-400">Badges Earned</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Skills Progress */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-purple-400" />
              <span>Skills Progress</span>
            </h2>
            <div className="space-y-4">
              {skillsProgress.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">{skill.skill}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">Level {skill.level}</span>
                      <span className="text-purple-400 font-bold">{skill.progress}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${getProgressColor(skill.progress)} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${skill.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <Clock className="h-6 w-6 text-cyan-400" />
              <span>Recent Activity</span>
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{activity.action}</p>
                    <p className="text-gray-400 text-sm">{activity.date}</p>
                  </div>
                  <div className="flex items-center space-x-1 text-yellow-400">
                    <Zap className="h-4 w-4" />
                    <span className="font-bold">+{activity.xp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mt-8 bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
            <Award className="h-6 w-6 text-orange-400" />
            <span>Achievements</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className={`p-4 rounded-lg border transition-all ${
                achievement.earned 
                  ? 'bg-slate-700/50 border-green-500/30' 
                  : 'bg-slate-700/20 border-slate-600 opacity-50'
              }`}>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">{achievement.icon}</span>
                  <h3 className={`font-bold ${achievement.earned ? 'text-white' : 'text-gray-400'}`}>
                    {achievement.name}
                  </h3>
                </div>
                <p className="text-gray-400 text-sm">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;