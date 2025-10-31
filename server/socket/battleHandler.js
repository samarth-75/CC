const battles = {}; // { battleId: { players: [socketId], submissions: { socketId: code } } }
const sampleAnswers = {
  1: `function Button({ variant, size, disabled, onClick, children }) {
  // Correct implementation for React Button
  return (
    <button
      className={\`btn \${variant} \${size}\`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}`,
  2: `function speedRun(arr) {
  // Correct implementation for Algorithm Speed Run
  return arr.sort((a, b) => a - b);
}`,
  3: `.container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
}`,
  4: `function quizAnswer(question) {
  // Correct implementation for JS Quiz Battle
  return question.correctOption;
}`
};

function isCodeCorrect(userCode, questionId) {
  return userCode.trim() === (sampleAnswers[questionId] || '').trim();
}

export function battleSocketHandler(io, socket) {
  // Player joins a battle
  socket.on('joinBattle', ({ battleId }) => {
    if (!battles[battleId]) {
      battles[battleId] = { players: [], submissions: {} };
    }
    if (!battles[battleId].players.includes(socket.id)) {
      battles[battleId].players.push(socket.id);
    }

    socket.join(battleId);

    // Notify both players when ready
    if (battles[battleId].players.length === 2) {
      io.to(battleId).emit('battleReady', { battleId });
    } else {
      socket.emit('waitingForOpponent', { battleId });
    }
  });

  // Player starts the battle
  socket.on('startBattle', ({ battleId }) => {
    io.to(battleId).emit('battleStarted', { battleId });
  });

  // Player submits code
  socket.on('submitSolution', ({ battleId, questionId, code }) => {
    if (!battles[battleId]) return;
    battles[battleId].submissions[socket.id] = { code, correct: isCodeCorrect(code, questionId) };

    // If only one player has submitted, show waiting popup
    if (Object.keys(battles[battleId].submissions).length === 1) {
      socket.emit('waitingOpponentToFinish', { battleId });
    }

    // If both players have submitted, calculate result
    if (Object.keys(battles[battleId].submissions).length === 2) {
      const [player1, player2] = battles[battleId].players;
      const sub1 = battles[battleId].submissions[player1];
      const sub2 = battles[battleId].submissions[player2];

      // Victory/Defeat logic
      const result = {};
      result[player1] = sub1.correct ? 'victory' : 'defeat';
      result[player2] = sub2.correct ? 'victory' : 'defeat';

      // If both correct, both get victory
      if (sub1.correct && sub2.correct) {
        result[player1] = 'victory';
        result[player2] = 'victory';
      }

      io.to(battleId).emit('battleResult', result);

      // Clean up
      delete battles[battleId];
    }
  });

  // Clean up on disconnect
  socket.on('disconnect', () => {
    for (const battleId in battles) {
      battles[battleId].players = battles[battleId].players.filter(id => id !== socket.id);
      if (battles[battleId].players.length === 0) {
        delete battles[battleId];
      }
    }
  });
}