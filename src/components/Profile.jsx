import React, { useState, useRef } from 'react';
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
  Zap,
  Plus,
  X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ExternalLink} from 'lucide-react';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef();
  const [showAddProject, setShowAddProject] = useState(false);
  const [projectForm, setProjectForm] = useState({
    name: '',
    github: '',
    description: ''
  });


const handleAddProject = async () => {
  if (!projectForm.name.trim() || !projectForm.github.trim() || !projectForm.description.trim()) return;
  try {
    const res = await fetch('/api/profile/add-project', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(projectForm)
    });
    const data = await res.json();
    if (res.ok) {
      setUser({ ...user, projects: data.projects });
      setProjectForm({ name: '', github: '', description: '' });
      setShowAddProject(false);
      setShowSuccess(true); // Show popup
      setTimeout(() => {
        setShowSuccess(false);
        window.location.reload(); // Reload page after 1.5s
      }, 1500);
    }
  } catch (error) {
    // Optionally show error
  }
};

  const handleDeleteProject = async (projectName) => {
    try {
      const res = await fetch('/api/profile/delete-project', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name: projectName })
      });
      const data = await res.json();
      if (res.ok) {
        setUser({ ...user, projects: data.projects });
      }
    } catch (error) {
      // Optionally show error
    }
  };

  // Upload profile picture
  const handlePictureChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result;
      setUploading(true);
      try {
        const res = await fetch('/api/profile/upload-picture', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ profilePicture: base64String })
        });
        const data = await res.json();
        if (res.ok) {
          setUser({ ...user, profilePicture: data.profilePicture });
        }
      } catch (err) {
        // Optionally show error
      }
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  // Add skill to database
  const handleAddSkill = async () => {
    if (!newSkillName.trim()) return;
    if (user.skills?.includes(newSkillName.trim())) return;

    try {
      const res = await fetch('/api/skills/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name: newSkillName.trim() })
      });
      const data = await res.json();
      if (res.ok) {
        setUser({ ...user, skills: data.skills });
        setNewSkillName('');
        setShowAddSkill(false);
      }
    } catch (error) {
      // Optionally show error
    }
  };

  // Delete skill from database
  const handleDeleteSkill = async (skillName) => {
    try {
      const res = await fetch('/api/skills/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name: skillName })
      });
      const data = await res.json();
      if (res.ok) {
        setUser({ ...user, skills: data.skills });
      }
    } catch (error) {
      // Optionally show error
    }
  };

  // Achievements and recent activity (static for now)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative group">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center overflow-hidden">
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="h-12 w-12 text-white" />
                )}
              </div>
              <button
                className="absolute bottom-0 right-0 bg-yellow-500 rounded-full p-2 hover:bg-yellow-400 transition"
                onClick={() => fileInputRef.current.click()}
                disabled={uploading}
                title="Change picture"
              >
                <Star className="h-4 w-4 text-white" />
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handlePictureChange}
              />
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
                  <span>Joined {user?.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : ''}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-purple-400" />
                  <span className="text-white font-bold">
                    Level {user?.xp !== undefined ? Math.floor(user.xp / 100) : 0}
                  </span>
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
              <span className="text-gray-300">
                Progress to Level {(user?.xp !== undefined ? Math.floor(user.xp / 100) + 1 : 1)}
              </span>
              <span className="text-purple-400 font-bold">
                {user?.xp !== undefined ? user.xp % 100 : 0}%
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-500 to-cyan-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${user?.xp !== undefined ? user.xp % 100 : 0}%` }}
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
          {/* My Skills Section */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <TrendingUp className="h-6 w-6 text-purple-400" />
                <span>My Skills</span>
              </h2>
              <button
                onClick={() => setShowAddSkill(!showAddSkill)}
                className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
              >
                <Plus className="h-4 w-4" />
                <span>Add Skill</span>
              </button>
            </div>

            {/* Add Skill Form */}
            {showAddSkill && (
              <div className="mb-6 p-4 bg-slate-700/50 rounded-lg border border-purple-500/30">
                <h3 className="text-white font-medium mb-3">Add New Skill</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Skill name (e.g., Python, React, AWS)"
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                    className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleAddSkill}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => {
                        setShowAddSkill(false);
                        setNewSkillName('');
                      }}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Skills List */}
            <div className="space-y-3">
              {user?.skills && user.skills.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {user.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="group flex items-center space-x-2 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/30 rounded-lg px-4 py-2 hover:border-purple-500/50 transition"
                    >
                      <span className="text-white font-medium">{skill}</span>
                      <button
                        onClick={() => handleDeleteSkill(skill)}
                        className="text-red-400 hover:text-red-300 transition opacity-0 group-hover:opacity-100"
                        title="Remove skill"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400 mb-2">No skills added yet</p>
                  <p className="text-gray-500 text-sm">Click "Add Skill" to showcase your expertise!</p>
                </div>
              )}
            </div>
          </div>

          
        </div>

        {/* Projects Section */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <Star className="h-6 w-6 text-orange-400" />
                <span>My Projects</span>
              </h2>
              <button
                onClick={() => setShowAddProject(!showAddProject)}
                className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
              >
                <Plus className="h-4 w-4" />
                <span>Add Project</span>
              </button>
            </div>
            {/* Add Project Form */}
            {showAddProject && (
              <div className="mb-6 p-4 bg-slate-700/50 rounded-lg border border-purple-500/30">
                <h3 className="text-white font-medium mb-3">Add New Project</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Project Name"
                    value={projectForm.name}
                    onChange={e => setProjectForm({ ...projectForm, name: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg mb-2"
                  />
                  <input
                    type="url"
                    placeholder="GitHub Link"
                    value={projectForm.github}
                    onChange={e => setProjectForm({ ...projectForm, github: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg mb-2"
                  />
                  <textarea
                    placeholder="Description (max 50 words)"
                    value={projectForm.description}
                    onChange={e => setProjectForm({ ...projectForm, description: e.target.value })}
                    maxLength={250}
                    className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg mb-2"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleAddProject}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      Submit
                    </button>
                    <button
                      onClick={() => {
                        setShowAddProject(false);
                        setProjectForm({ name: '', github: '', description: '' });
                      }}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
           {/* Projects List */}
            <div className="space-y-3">
              {user?.projects && user.projects.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {user.projects.map((project, idx) => (
                    <div
                      key={idx}
                      className="group flex flex-col md:flex-row md:items-center justify-between bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/30 rounded-lg px-4 py-2 hover:border-purple-500/50 transition"
                    >
                      <div>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white font-bold text-lg hover:underline flex items-center"
                        >
                          {project.name}
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </a>
                        <p className="text-gray-300 text-sm">{project.description}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteProject(project.name)}
                        className="text-red-400 hover:text-red-300 transition opacity-0 group-hover:opacity-100 mt-2 md:mt-0"
                        title="Remove project" 
                        >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400 mb-2">No projects added yet</p>
                  <p className="text-gray-500 text-sm">Click "Add Project" to showcase your work!</p>
                </div>
              )}
              {showSuccess && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
    <div className="bg-green-600 text-white px-8 py-4 rounded-lg shadow-lg text-xl">
      Project added successfully!
    </div>
  </div>
)}
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
    
    
  );
};

export default Profile;