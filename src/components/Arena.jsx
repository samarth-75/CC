import React, { useState, useEffect, useRef } from 'react';
import { Sword, Play, Zap, Clock, User, Trophy, X, CheckCircle, XCircle, Code, Send, Flag } from 'lucide-react';

// Mock Socket.IO connection (in production, use actual socket.io-client)
const mockSocket = {
  listeners: {},
  on(event, callback) {
    this.listeners[event] = callback;
  },
  emit(event, data) {
    console.log('Socket emit:', event, data);
    // Simulate responses
    if (event === 'joinBattle') {
      setTimeout(() => {
        this.listeners['battleJoined']?.({
          battleId: data.battleId,
          player: { id: 'player1', name: 'You' },
          opponent: { id: 'player2', name: 'CodeNinja42', status: 'coding' }
        });
      }, 500);
    }
    if (event === 'submitSolution') {
      setTimeout(() => {
        this.listeners['battleComplete']?.(data.mockResult);
      }, 1000);
    }
  }
};

// Monaco Editor Mock (simplified version)
const CodeEditor = ({ value, onChange, language = 'javascript' }) => {
  return (
    <div className="relative h-full bg-slate-950 rounded-lg overflow-hidden border border-slate-700">
      <div className="absolute top-0 left-0 right-0 bg-slate-900 px-4 py-2 border-b border-slate-700 flex items-center justify-between">
        <span className="text-sm text-gray-400 font-mono">{language}</span>
        <Code className="h-4 w-4 text-gray-500" />
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-full bg-slate-950 text-gray-100 font-mono text-sm p-4 pt-14 resize-none focus:outline-none"
        style={{ tabSize: 2 }}
        spellCheck="false"
      />
    </div>
  );
};

// Victory Modal Component
const VictoryModal = ({ show, onClose, battleStats }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full border border-green-500/30 animate-fadeIn">
        <div className="flex justify-end mb-4">
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="flex justify-center mb-6">
          <div className="bg-green-500/20 p-6 rounded-full">
            <Trophy className="h-16 w-16 text-green-400" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white text-center mb-2">Victory!</h2>
        <p className="text-gray-300 text-center mb-8">
          Congratulations! You solved the challenge first.
        </p>

        <div className="bg-slate-900/50 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Battle Statistics</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-gray-400">
                <Clock className="h-5 w-5" />
                <span>Your Time:</span>
              </div>
              <span className="text-white font-bold">{battleStats.yourTime}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-gray-400">
                <CheckCircle className="h-5 w-5" />
                <span>Tests Passed:</span>
              </div>
              <span className="text-green-400 font-bold">{battleStats.yourTests}</span>
            </div>

            <div className="h-px bg-slate-700 my-3"></div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-gray-400">
                <Clock className="h-5 w-5" />
                <span>Opponent Time:</span>
              </div>
              <span className="text-white font-bold">{battleStats.opponentTime}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-gray-400">
                <CheckCircle className="h-5 w-5" />
                <span>Tests Passed:</span>
              </div>
              <span className="text-red-400 font-bold">{battleStats.opponentTests}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white py-3 px-4 rounded-lg transition-all font-semibold"
        >
          Return to Arena
        </button>
      </div>
    </div>
  );
};

// Battle Room Component
const BattleRoom = ({ battle, onClose, onVictory }) => {
  const [code, setCode] = useState('function Button({ variant, size, disabled, onClick, children }) {\n  // Implement your button component here\n  \n}');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [testResults, setTestResults] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [opponentStatus, setOpponentStatus] = useState('coding');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Simulate opponent progress
    const statusTimer = setInterval(() => {
      const statuses = ['coding', 'testing', 'coding'];
      setOpponentStatus(statuses[Math.floor(Math.random() * statuses.length)]);
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(statusTimer);
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTestCode = () => {
    setTestResults({
      passed: 7,
      total: 10,
      tests: [
        { name: 'Primary variant renders', passed: true },
        { name: 'Secondary variant renders', passed: true },
        { name: 'Small size applied', passed: true },
        { name: 'Medium size applied', passed: true },
        { name: 'Large size applied', passed: true },
        { name: 'Disabled state works', passed: false },
        { name: 'onClick handler fires', passed: true },
        { name: 'Children render correctly', passed: true },
        { name: 'Outline variant renders', passed: false },
        { name: 'Button is accessible', passed: false }
      ]
    });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    const mockResult = {
      yourTime: formatTime(600 - timeLeft),
      yourTests: '10/10',
      opponentTime: '03:45',
      opponentTests: '7/10'
    };

    mockSocket.emit('submitSolution', {
      battleId: battle.id,
      code,
      mockResult
    });

    setTimeout(() => {
      setIsSubmitting(false);
      onVictory(mockResult);
    }, 1500);
  };

  const handleSurrender = () => {
    if (confirm('Are you sure you want to surrender? This will count as a loss.')) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900 z-50 overflow-hidden">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
          <div className="flex items-center space-x-4">
            <Sword className="h-6 w-6 text-red-400" />
            <div>
              <h2 className="text-xl font-bold text-white">{battle.title}</h2>
              <p className="text-sm text-gray-400">Level {battle.requiredLevel} Challenge</p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {/* Timer */}
            <div className="flex items-center space-x-2 bg-slate-900 px-4 py-2 rounded-lg border border-slate-700">
              <Clock className="h-5 w-5 text-yellow-400" />
              <span className={`text-xl font-mono font-bold ${timeLeft < 60 ? 'text-red-400' : 'text-white'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>

            {/* Opponent Status */}
            <div className="flex items-center space-x-3 bg-slate-900 px-4 py-2 rounded-lg border border-slate-700">
              <User className="h-5 w-5 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">CodeNinja42</div>
                <div className="flex items-center space-x-1">
                  <div className={`h-2 w-2 rounded-full ${opponentStatus === 'coding' ? 'bg-yellow-400' : 'bg-blue-400'} animate-pulse`}></div>
                  <span className="text-xs text-gray-300 capitalize">{opponentStatus}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleSurrender}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-all border border-red-600/30"
            >
              <Flag className="h-4 w-4" />
              <span>Surrender</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-73px)] max-w-screen-2xl mx-auto">
        {/* Left Panel - Challenge Description */}
        <div className="w-1/3 bg-slate-800/50 border-r border-slate-700 overflow-y-auto">
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Build a Reusable Button Component</h3>
            
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-400 mb-2">JavaScript</h4>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-3">Description</h4>
              <p className="text-gray-300 leading-relaxed">
                Create a flexible React button component that accepts different variants (primary, secondary, outline) and sizes (small, medium, large). The component should handle click events and support disabled states.
              </p>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-3">Examples</h4>
              <div className="bg-slate-900 rounded-lg p-4 mb-3">
                <div className="text-sm text-gray-400 mb-1">Input:</div>
                <code className="text-sm text-cyan-400 font-mono">
                  &lt;Button variant='primary'&gt;Click me&lt;/Button&gt;
                </code>
                <div className="text-sm text-gray-400 mt-2 mb-1">Output:</div>
                <code className="text-sm text-green-400 font-mono">
                  Renders primary styled button
                </code>
              </div>
              <div className="bg-slate-900 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Input:</div>
                <code className="text-sm text-cyan-400 font-mono">
                  &lt;Button size='small' disabled&gt;Small&lt;/Button&gt;
                </code>
                <div className="text-sm text-gray-400 mt-2 mb-1">Output:</div>
                <code className="text-sm text-green-400 font-mono">
                  Renders small disabled button
                </code>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-3">Constraints</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>Must support 3 variants: primary, secondary, outline</li>
                <li>Must support 3 sizes: small, medium, large</li>
                <li>Must handle disabled state</li>
                <li>Must accept onClick callback</li>
                <li>Must render children content</li>
              </ul>
            </div>

            {testResults && (
              <div className="bg-slate-900 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-3">Test Results</h4>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400">Tests Passed:</span>
                  <span className={`font-bold ${testResults.passed === testResults.total ? 'text-green-400' : 'text-yellow-400'}`}>
                    {testResults.passed}/{testResults.total}
                  </span>
                </div>
                <div className="space-y-2">
                  {testResults.tests.map((test, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm">
                      {test.passed ? (
                        <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                      )}
                      <span className={test.passed ? 'text-gray-300' : 'text-gray-400'}>
                        {test.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-6">
            <CodeEditor value={code} onChange={setCode} language="javascript" />
          </div>

          {/* Action Buttons */}
          <div className="bg-slate-800 border-t border-slate-700 px-6 py-4 flex items-center justify-end space-x-4">
            <button
              onClick={handleTestCode}
              className="px-6 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all font-medium"
            >
              Test Code
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-lg transition-all font-medium"
            >
              <Send className="h-4 w-4" />
              <span>{isSubmitting ? 'Submitting...' : 'Submit Solution'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Arena Component
const CodeBattleArena = () => {
  const [activeBattle, setActiveBattle] = useState(null);
  const [showVictory, setShowVictory] = useState(false);
  const [battleStats, setBattleStats] = useState(null);

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

  const handleJoinBattle = (battle) => {
    mockSocket.emit('joinBattle', { battleId: battle.id });
    setActiveBattle(battle);
  };

  const handleVictory = (stats) => {
    setBattleStats(stats);
    setShowVictory(true);
    setActiveBattle(null);
  };

  const handleCloseVictory = () => {
    setShowVictory(false);
    setBattleStats(null);
  };

  const handleCloseBattle = () => {
    setActiveBattle(null);
  };

  if (activeBattle) {
    return <BattleRoom battle={activeBattle} onClose={handleCloseBattle} onVictory={handleVictory} />;
  }

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

                <button
                  onClick={() => handleJoinBattle(match)}
                  className="w-full bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 text-white py-2 px-4 rounded-lg transition-all font-medium"
                >
                  Join Battle
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <VictoryModal 
        show={showVictory} 
        onClose={handleCloseVictory} 
        battleStats={battleStats}
      />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CodeBattleArena;