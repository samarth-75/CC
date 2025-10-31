import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Code, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const socket = io("http://localhost:5001", {
  transports: ["websocket", "polling"],
});

const QUESTIONS = {
  1: {
    title: "React Button Component",
    description:
      "Create a reusable React Button component that accepts props: variant, size, disabled, onClick, and children.",
  },
  2: {
    title: "Algorithm Speed Run",
    description:
      "Write a function speedRun(arr) that returns the array sorted in ascending order.",
  },
  3: {
    title: "CSS Grid Layout",
    description:
      "Write CSS to create a 2-column grid with 20px gap between columns.",
  },
  4: {
    title: "JavaScript Quiz Battle",
    description:
      "Write a function quizAnswer(question) that returns question.correctOption.",
  },
};

export default function Arena() {
  const [battleId, setBattleId] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [battleStatus, setBattleStatus] = useState("idle");
  const [questionId, setQuestionId] = useState(1);
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));
    socket.on("waitingForOpponent", () => {
      setBattleStatus("waiting");
      setMessage("Waiting for opponent...");
    });
    socket.on("battleReady", () => {
      setBattleStatus("ready");
      setMessage("Opponent joined! Click start to begin!");
    });
    socket.on("battleStarted", ({ questionId }) => {
      setBattleStatus("started");
      setQuestionId(questionId);
      setMessage("Battle started! Solve the challenge!");
    });
    socket.on("waitingOpponentToFinish", () => {
      setBattleStatus("waitingOpponent");
      setMessage("Waiting for your opponent to finish...");
    });
    socket.on("battleResult", ({ result }) => {
      setBattleStatus("completed");
      setResult(result);
    });

    return () => socket.off();
  }, []);

  const handleJoinBattle = () => {
    if (!battleId.trim()) return alert("Enter Battle ID!");
    socket.emit("joinBattle", { battleId });
  };

  const handleStartBattle = () => socket.emit("startBattle", { battleId });

  const handleSubmitSolution = () => {
    if (!code.trim()) return alert("Write your code before submitting!");
    socket.emit("submitSolution", { battleId, questionId, code });
    setMessage("Code submitted!");
  };

  const handleBackToArena = () => {
    socket.emit("leaveBattle", { battleId });
    // Reset all states
    setBattleId("");
    setBattleStatus("idle");
    setQuestionId(1);
    setCode("");
    setResult(null);
    setMessage("");
  };

  const currentQuestion = QUESTIONS[questionId];

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center p-6 relative">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Trophy className="text-yellow-400" /> Battle Arena
      </h1>

      {!isConnected ? (
        <p className="text-red-500">Connecting to server...</p>
      ) : (
        <>
          {battleStatus === "idle" && (
            <div className="flex gap-3 mb-5">
              <input
                type="text"
                placeholder="Enter Battle ID"
                className="bg-gray-800 px-4 py-2 rounded-xl text-white outline-none"
                value={battleId}
                onChange={(e) => setBattleId(e.target.value)}
              />
              <button
                onClick={handleJoinBattle}
                className="bg-blue-600 px-5 py-2 rounded-xl hover:bg-blue-700"
              >
                Join Battle
              </button>
            </div>
          )}

          {message && (
            <div className="mb-4 p-3 bg-gray-800 rounded-xl w-full max-w-md text-center">
              {message}
            </div>
          )}

          {battleStatus === "ready" && (
            <button
              onClick={handleStartBattle}
              className="bg-green-600 px-6 py-2 rounded-xl hover:bg-green-700"
            >
              Start Battle
            </button>
          )}

          {battleStatus === "started" && (
            <div className="w-full max-w-2xl mt-6">
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-3">
                <Code className="text-blue-400" /> {currentQuestion.title}
              </h2>
              <p className="text-gray-300 mb-4 italic">
                {currentQuestion.description}
              </p>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Write your code here..."
                className="w-full h-56 bg-gray-900 text-white p-3 rounded-xl outline-none"
              />
              <button
                onClick={handleSubmitSolution}
                className="bg-purple-600 mt-4 px-6 py-2 rounded-xl hover:bg-purple-700"
              >
                Submit Solution
              </button>
            </div>
          )}
        </>
      )}

      {/* 🏆 Animated Popup */}
      <AnimatePresence>
        {battleStatus === "completed" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 flex items-center justify-center bg-black/80"
          >
            <div className="bg-gray-900 p-8 rounded-2xl text-center shadow-2xl">
              <Trophy
                className={`w-16 h-16 mx-auto mb-4 ${
                  result === "victory" ? "text-yellow-400" : "text-gray-500"
                }`}
              />
              <h2 className="text-3xl font-bold mb-2">
                {result === "victory" ? "🏆 Victory!" : "😞 Defeat"}
              </h2>
              <p className="text-gray-400">
                {result === "victory"
                  ? "You submitted the first correct code!"
                  : "Your opponent submitted first!"}
              </p>
              <button
                onClick={handleBackToArena}
                className="mt-6 bg-blue-600 px-6 py-2 rounded-xl hover:bg-blue-700"
              >
                Back to Arena
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
