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
  const [, forceUpdate] = useState({});

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

    const handleMove = (orig, dest) => {
      const move = chess.move({ from: orig, to: dest });
      if (move) {
        console.log(`Moved from ${orig} to ${dest}`);
        groundRef.current.set({ 
          fen: chess.fen(), 
          turnColor: chess.turn() === 'w' ? 'white' : 'black', 
          movable: { dests: updateDests() } 
        });
      } else {
        console.log(`Attempted illegal move from ${orig} to ${dest}`);
        groundRef.current.set({ fen: chess.fen() });
      }
      forceUpdate({});
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
  }, []);

  return (
    <div style={{ width: '400px', height: '400px' }}>
      <div ref={chessgroundRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}