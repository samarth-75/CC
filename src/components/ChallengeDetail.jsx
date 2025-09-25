import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ChallengeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState(null);
  const [selected, setSelected] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const { user, setUser } = useAuth();

  useEffect(() => {
    fetch(`http://localhost:5000/api/challenges/${id}`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setChallenge(data));
  }, [id]);

  if (!challenge) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="text-white text-2xl">Loading...</div>
    </div>
  );

  const handleOption = (qIdx, oIdx) => {
    if (!submitted) {
      setSelected(prev => ({ ...prev, [qIdx]: oIdx }));
    }
  };

  const handleSubmit = async () => {
    if (!challenge) return;
    let correct = 0;
    challenge.questions.forEach((q, idx) => {
      if (selected[idx] === q.correctAnswer) correct++;
    });
    setScore(correct);
    setSubmitted(true);

    // Calculate XP
    const xpEarned = correct === challenge.questions.length
      ? challenge.xpReward
      : Math.floor((correct / challenge.questions.length) * challenge.xpReward);

    // Send to backend and update user context
    try {
      const res = await fetch(`http://localhost:5000/api/challenges/${challenge._id || challenge.id}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ xpEarned }),
      });
      const data = await res.json();
      setUser({ ...user, xp: data.xp, completedChallenges: data.completedChallenges });
    } catch (err) {
      // Optionally show error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="w-full max-w-2xl bg-slate-800/90 rounded-2xl shadow-2xl p-8 animate-fade-in-up">
        {/* Animation keyframes */}
        <style>
          {`
            .animate-fade-in-up {
              animation: fadeInUp 0.7s cubic-bezier(.39,.575,.565,1.000) both;
            }
            @keyframes fadeInUp {
              0% {
                opacity: 0;
                transform: translateY(40px) scale(0.95);
              }
              100% {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
          `}
        </style>
        <h2 className="text-3xl font-bold text-cyan-300 mb-6 text-center">{challenge.title}</h2>
        {challenge.questions && challenge.questions.length > 0 ? (
          <form onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
            {challenge.questions.map((q, idx) => (
              <div key={idx} className="mb-8">
                <div className="text-lg font-semibold text-white mb-3">{idx + 1}. {q.question}</div>
                <div className="grid grid-cols-1 gap-3">
                  {q.options.map((opt, oidx) => {
                    // Feedback coloring
                    let optionClass = "px-5 py-3 rounded-lg border transition-all cursor-pointer ";
                    if (submitted) {
                      if (oidx === q.correctAnswer) {
                        optionClass += "border-green-400 bg-green-700/60 text-white";
                      } else if (selected[idx] === oidx) {
                        optionClass += "border-red-400 bg-red-700/60 text-white";
                      } else {
                        optionClass += "bg-slate-700/60 border-slate-600 text-cyan-200";
                      }
                    } else {
                      optionClass += selected[idx] === oidx
                        ? "bg-cyan-700/80 border-cyan-400 text-white"
                        : "bg-slate-700/60 border-slate-600 text-cyan-200 hover:bg-cyan-800/40";
                    }
                    return (
                      <button
                        type="button"
                        key={oidx}
                        className={optionClass}
                        disabled={submitted}
                        onClick={() => handleOption(idx, oidx)}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            {!submitted ? (
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold text-lg mt-2 hover:from-purple-700 hover:to-cyan-700 transition-all"
              >
                Submit Answers
              </button>
            ) : (
              <div className="text-center mt-4">
                <div className="text-2xl font-bold text-cyan-300 mb-2">
                  You scored {score} / {challenge.questions.length}
                </div>
                <div className="text-lg text-purple-200 mb-2">
                  XP Earned: {score === challenge.questions.length ? challenge.xpReward : Math.floor((score / challenge.questions.length) * challenge.xpReward)}
                </div>
                <button
                  className="mt-2 px-6 py-2 rounded bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold hover:from-purple-700 hover:to-cyan-700 transition"
                  onClick={() => navigate('/challenges')}
                  type="button"
                >
                  Back to Challenges
                </button>
              </div>
            )}
          </form>
        ) : (
          <div className="text-gray-300 text-center mb-6">No questions found for this challenge.</div>
        )}
      </div>
    </div>
  );
};

export default ChallengeDetail;