import React, { useEffect, useRef, useState } from 'react';
import { Chessground } from 'chessground';
import { Chess } from 'chess.js';
import './chessground-assets/chessground.base.css';
import './chessground-assets/chessground.brown.css';
import './chessground-assets/chessground.cburnett.css';

export default function App() {
  const chessgroundRef = useRef(null);
  const chessRef = useRef(new Chess());
  const groundRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameStatus, setGameStatus] = useState('');

  useEffect(() => {
    const chess = chessRef.current;

    const updateDests = () => {
      const dests = new Map();
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          const square = String.fromCharCode(97 + i) + (j + 1);
          const moves = chess.moves({ square: square, verbose: true });
          if (moves.length) dests.set(square, moves.map(m => m.to));
        }
      }
      return dests;
    };

    const checkGameOver = () => {
      if (chess.isCheckmate()) {
        setGameOver(true);
        setGameStatus(`Checkmate! ${chess.turn() === 'w' ? 'Black' : 'White'} wins!`);
      } else if (chess.isDraw()) {
        setGameOver(true);
        setGameStatus('Game Over! It\'s a draw.');
      } else if (chess.isStalemate()) {
        setGameOver(true);
        setGameStatus('Game Over! Stalemate.');
      } else if (chess.isThreefoldRepetition()) {
        setGameOver(true);
        setGameStatus('Game Over! Draw by threefold repetition.');
      } else if (chess.isInsufficientMaterial()) {
        setGameOver(true);
        setGameStatus('Game Over! Draw by insufficient material.');
      }
    };

    const handleMove = (orig, dest) => {
      if (gameOver) return; // Prevent moves if the game is over

      const move = chess.move({ from: orig, to: dest });
      if (move) {
        console.log(`Moved from ${orig} to ${dest}`);
        groundRef.current.set({ 
          fen: chess.fen(), 
          turnColor: chess.turn() === 'w' ? 'white' : 'black', 
          movable: { dests: updateDests() } 
        });
        checkGameOver();
      } else {
        console.log(`Attempted illegal move from ${orig} to ${dest}`);
        groundRef.current.set({ fen: chess.fen() });
      }
    };

    const config = {
      fen: chess.fen(),
      orientation: 'white',
      turnColor: 'white',
      movable: {
        free: false,
        color: 'both',
        dests: updateDests(),
      },
      events: {
        move: handleMove,
        select: (square) => {
          const piece = chess.get(square);
          if (piece) {
            console.log(`Selected square: ${square}, Piece: ${piece.color}${piece.type}`);
          } else {
            console.log(`Empty square: ${square}`);
          }
        },
      },
      animation: {
        enabled: true,
        duration: 200
      },
      highlight: {
        lastMove: true,
        check: true
      },
      premovable: {
        enabled: false
      }
    };

    groundRef.current = Chessground(chessgroundRef.current, config);

    return () => {
      if (groundRef.current) {
        groundRef.current.destroy();
      }
    };
  }, [gameOver]);

  return (
    <div style={{ width: '400px', height: '400px', position: 'relative' }}>
      <div ref={chessgroundRef} style={{ width: '100%', height: '100%' }} />
      {gameOver && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          fontSize: '24px',
          textAlign: 'center'
        }}>
          {gameStatus}
        </div>
      )}
    </div>
  );
}