import React, { useState } from 'react';
import Chessboard from './Chessboard';
import GameOverlay from './GameOverlay';
import MoveList from './MoveList';

export default function App() {
  const [gameOver, setGameOver] = useState(false);
  const [gameStatus, setGameStatus] = useState('');
  const [moveHistory, setMoveHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedMoveIndex, setSelectedMoveIndex] = useState(null);

  const handleGameOver = (status) => {
    setGameOver(true);
    setGameStatus(status);
  };

  const resetGame = () => {
    setGameOver(false);
    setGameStatus('');
    setMoveHistory([]);
    setSelectedMoveIndex(null);
  };

  const toggleDarkMode = () => setDarkMode((d) => !d);

  const backgroundColor = darkMode ? '#181a1b' : '#fff';
  const moveListBg = darkMode ? '#23272f' : '#f8f8f8';
  const moveListColor = darkMode ? '#f8f8f8' : '#23272f';
  const borderColor = darkMode ? '#333' : '#ccc';

  const canMove = selectedMoveIndex === null || selectedMoveIndex === moveHistory.length;

  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100vw', height: '100vh', margin: 0, position: 'fixed', top: 0, left: 0, background: backgroundColor, color: moveListColor, transition: 'background 0.3s, color 0.3s' }}>
      <button
        onClick={toggleDarkMode}
        style={{
          position: 'absolute',
          top: 24,
          right: 32,
          zIndex: 10,
          background: darkMode ? '#23272f' : '#fff',
          color: darkMode ? '#f8f8f8' : '#23272f',
          border: `1px solid ${borderColor}`,
          borderRadius: 6,
          padding: '8px 18px',
          fontSize: 18,
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
        }}
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <div style={{ flex: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div style={{ width: 'min(100%, 87.5vh)', height: 'min(100%, 87.5vh)', aspectRatio: '1 / 1', background: backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: darkMode ? '0 0 0 2px #23272f' : '0 0 0 2px #eee' }}>
          <Chessboard onGameOver={handleGameOver} onMoveHistoryChange={setMoveHistory} viewMoveIndex={selectedMoveIndex} canMove={canMove} key={gameOver ? 'game-over' : 'game-active'} />
          {gameOver && <GameOverlay status={gameStatus} onReset={resetGame} />}
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 0, background: moveListBg, borderLeft: `1px solid ${borderColor}`, padding: '40px 12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', height: '100vh', color: moveListColor, transition: 'background 0.3s, color 0.3s' }}>
        <MoveList moveHistory={moveHistory} darkMode={darkMode} />
      </div>
    </div>
  );
}