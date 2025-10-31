import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const battles = {}; // { battleId: { players: [], questionId, submissions: {} } }

// ✅ Predefined correct answers
const CORRECT_SOLUTIONS = {
  1: "function Button",
  2: "arr.sort",
  3: "display: grid",
  4: "return question.correctOption",
};

io.on("connection", (socket) => {
  console.log("🔗 New user connected:", socket.id);

  socket.on("joinBattle", ({ battleId }) => {
    if (!battles[battleId]) battles[battleId] = { players: [], submissions: {} };
    if (!battles[battleId].players.includes(socket.id)) {
      battles[battleId].players.push(socket.id);
    }

    socket.join(battleId);

    if (battles[battleId].players.length === 1) {
      io.to(socket.id).emit("waitingForOpponent");
    } else if (battles[battleId].players.length === 2) {
      io.to(battleId).emit("battleReady");
    }
  });

  socket.on("startBattle", ({ battleId }) => {
    const battle = battles[battleId];
    if (!battle) return;

    // Choose random question
    const questionId = Math.floor(Math.random() * 4) + 1;
    battle.questionId = questionId;

    io.to(battleId).emit("battleStarted", { questionId });
  });

  socket.on("submitSolution", ({ battleId, questionId, code }) => {
    const battle = battles[battleId];
    if (!battle) return;

    const isCorrect =
      code.toLowerCase().includes(CORRECT_SOLUTIONS[questionId].toLowerCase());

    battle.submissions[socket.id] = isCorrect ? "correct" : "wrong";

    const otherPlayer = battle.players.find((p) => p !== socket.id);

    // 🏆 Decide winner
    if (isCorrect) {
      // If first correct submission → instant victory
      io.to(socket.id).emit("battleResult", { result: "victory" });
      if (otherPlayer)
        io.to(otherPlayer).emit("battleResult", { result: "defeat" });
      delete battles[battleId]; // reset after completion
    } else {
      // If wrong, just notify them to wait
      io.to(socket.id).emit("waitingOpponentToFinish");
    }
  });

  socket.on("leaveBattle", ({ battleId }) => {
  const battle = battles[battleId];
  if (battle) {
    // Remove player from that battle
    battle.players = battle.players.filter((p) => p !== socket.id);

    // If no players left, delete the battle
    if (battle.players.length === 0) {
      delete battles[battleId];
    }
  }

  socket.leave(battleId);
  console.log(`🚪 ${socket.id} left battle ${battleId}`);
});

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

server.listen(5001, () => {
  console.log("⚡ Server running on port 5001");
});
