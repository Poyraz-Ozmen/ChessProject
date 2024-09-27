import React, { useState } from 'react';
import Chessboard from './Chessboard';
import GameOverlay from './GameOverlay';

export default function App() {
  const [gameOver, setGameOver] = useState(false);
  const [gameStatus, setGameStatus] = useState('');

  const handleGameOver = (status) => {
    setGameOver(true);
    setGameStatus(status);
  };

  const resetGame = () => {
    setGameOver(false);
    setGameStatus('');
  };

  return (
    <div style={{ width: '400px', height: '400px', position: 'relative', margin: '20px auto' }}>
      <Chessboard onGameOver={handleGameOver} key={gameOver ? 'game-over' : 'game-active'} />
      {gameOver && <GameOverlay status={gameStatus} onReset={resetGame} />}
    </div>
  );
}