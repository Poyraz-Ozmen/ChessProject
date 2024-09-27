import React from 'react';

export default function GameOverlay({ status, onReset }) {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      fontSize: '24px',
      textAlign: 'center'
    }}>
      <div>{status}</div>
      <button 
        onClick={onReset}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '18px',
          cursor: 'pointer'
        }}
      >
        New Game
      </button>
    </div>
  );
}