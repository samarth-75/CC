import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Code2, 
  Trophy, 
  Sword, 
  Users, 
  Zap, 
  Target,
  Star,
  ArrowRight,
  Play,
  Shield,
  Gamepad2
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Code2 className="h-10 w-10 text-purple-400" />
              <div className="absolute -inset-1 bg-purple-400/20 rounded-lg blur"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              CodeCrafters
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              to="/auth" 
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Sign In
            </Link>
            <Link 
              to="/auth" 
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-6 py-2 rounded-lg transition-all transform hover:scale-105 font-medium shadow-lg"
            >
              Join Now
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
              <Star className="h-4 w-4 text-purple-400 animate-pulse" />
              <span className="text-purple-300 text-sm font-medium">The Ultimate Developer Arena</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-400 bg-clip-text text-transparent">
                Code. Compete.
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-purple-200 to-white bg-clip-text text-transparent">
                Conquer.
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join the ultimate gamified platform where developers battle in live coding arenas, 
              level up their skills, and compete for glory in real-time challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/auth"
                className="group bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-4 rounded-lg transition-all transform hover:scale-105 font-bold text-lg shadow-xl flex items-center justify-center space-x-2"
              >
                <Sword className="h-5 w-5" />
                <span>Enter the Arena</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/auth"
                className="group border-2 border-purple-500 hover:bg-purple-500/10 text-white px-8 py-4 rounded-lg transition-all transform hover:scale-105 font-bold text-lg flex items-center justify-center space-x-2"
              >
                <Trophy className="h-5 w-5" />
                <span>View Leaderboard</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Why CodeCrafters is Different
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <div className="group bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all transform hover:scale-105">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Gamepad2 className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold">Dev Battles</h3>
              </div>
              <p className="text-gray-300">
                Go head-to-head in live coding challenges. 1v1 or team battles with real-time audience voting.
              </p>
            </div>

            <div className="group bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/40 transition-all transform hover:scale-105">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-cyan-500/20 rounded-lg">
                  <Zap className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold">Live Code Arena</h3>
              </div>
              <p className="text-gray-300">
                Real-time collaborative coding with leaderboards, timers, and live spectating.
              </p>
            </div>

            <div className="group bg-slate-800/50 backdrop-blur-sm border border-orange-500/20 rounded-xl p-6 hover:border-orange-500/40 transition-all transform hover:scale-105">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <Target className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="text-xl font-bold">Gamified Learning</h3>
              </div>
              <p className="text-gray-300">
                Earn XP, level up, unlock achievements, and follow structured learning paths.
              </p>
            </div>

            <div className="group bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all transform hover:scale-105">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Users className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold">Voice Code Rooms</h3>
              </div>
              <p className="text-gray-300">
                Join voice-enabled rooms where developers explain solutions in real-time.
              </p>
            </div>

            <div className="group bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/40 transition-all transform hover:scale-105">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-cyan-500/20 rounded-lg">
                  <Shield className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold">Dev Career Map</h3>
              </div>
              <p className="text-gray-300">
                Visual journey tracking your skills, XP, challenges, and career progression.
              </p>
            </div>

            <div className="group bg-slate-800/50 backdrop-blur-sm border border-orange-500/20 rounded-xl p-6 hover:border-orange-500/40 transition-all transform hover:scale-105">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <Play className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="text-xl font-bold">Dev Labs</h3>
              </div>
              <p className="text-gray-300">
                Test tools, APIs, and components in mini-sandboxes shared by the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative px-6 py-20 bg-gradient-to-r from-purple-900/50 to-cyan-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Ready to Level Up Your Dev Game?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are already competing, learning, and growing in the CodeCrafters arena.
          </p>
          <Link 
            to="/auth"
            className="group bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-12 py-4 rounded-lg transition-all transform hover:scale-105 font-bold text-xl shadow-2xl inline-flex items-center space-x-3"
          >
            <Sword className="h-6 w-6" />
            <span>Start Your Journey</span>
            <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-6 py-12 border-t border-purple-500/20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Code2 className="h-8 w-8 text-purple-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              CodeCrafters
            </span>
          </div>
          <p className="text-gray-400">
            © 2025 CodeCrafters. The ultimate developer arena platform.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;