import React from 'react';

export default function MoveList({ moveHistory, darkMode }) {
  const renderMoveList = () => {
    const moves = [];
    for (let i = 0; i < moveHistory.length; i += 2) {
      const white = moveHistory[i] || '';
      const black = moveHistory[i + 1] || '';
      moves.push(
        <div key={i} style={{ marginBottom: 2 }}>
          <strong>{Math.floor(i / 2) + 1}.</strong> {white} {black}
        </div>
      );
    }
    return moves;
  };

  return (
    <div>
      <h2 style={{ marginTop: 0, marginBottom: 24, color: darkMode ? '#f8f8f8' : '#23272f' }}>Move List</h2>
      <div style={{ flex: 1, overflowY: 'auto', fontSize: 20, color: darkMode ? '#f8f8f8' : '#23272f' }}>{renderMoveList()}</div>
    </div>
  );
} 