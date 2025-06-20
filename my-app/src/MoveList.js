import React from 'react';

export default function MoveList({ moveHistory, darkMode, onMoveClick, selectedMoveIndex }) {
  const renderMoveList = () => {
    const moves = [];
    let ply = 0;
    for (let i = 0; i < moveHistory.length; i += 2) {
      const white = moveHistory[i] || '';
      const black = moveHistory[i + 1] || '';
      moves.push(
        <div key={i} style={{ marginBottom: 2, display: 'flex', alignItems: 'center', gap: 8 }}>
          <strong>{Math.floor(i / 2) + 1}.</strong>
          <span
            onClick={() => onMoveClick(ply + 1)}
            style={{
              cursor: 'pointer',
              color: darkMode ? '#b3e5fc' : '#1976d2',
              fontWeight: selectedMoveIndex === ply + 1 ? 'bold' : 'normal',
              background: selectedMoveIndex === ply + 1 ? (darkMode ? '#333' : '#e3f2fd') : 'none',
              borderRadius: 4,
              padding: '0 4px',
              transition: 'background 0.2s'
            }}
          >
            {white}
          </span>
          {black && (
            <span
              onClick={() => onMoveClick(ply + 2)}
              style={{
                cursor: 'pointer',
                color: darkMode ? '#b3e5fc' : '#1976d2',
                fontWeight: selectedMoveIndex === ply + 2 ? 'bold' : 'normal',
                background: selectedMoveIndex === ply + 2 ? (darkMode ? '#333' : '#e3f2fd') : 'none',
                borderRadius: 4,
                padding: '0 4px',
                transition: 'background 0.2s'
              }}
            >
              {black}
            </span>
          )}
        </div>
      );
      ply += black ? 2 : 1;
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