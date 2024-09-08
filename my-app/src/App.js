import React, { useEffect, useRef, useState } from 'react';
import { Chessground } from 'chessground';
import { Chess } from 'chess.js';
import './chessground-assets/chessground.base.css';
import './chessground-assets/chessground.brown.css';
import './chessground-assets/chessground.cburnett.css';

export default function App() {
  const chessgroundRef = useRef(null);
  const [chess] = useState(new Chess());
  const [ground, setGround] = useState(null); // Track Chessground instance

  // Function to update legal destinations based on the current position
  const updateDestinations = () => {
    const dests = {};
    chess.SQUARES.forEach(square => {
      const moves = chess.moves({ square, verbose: true });
      if (moves.length) {
        dests[square] = moves.map(move => move.to);
      }
    });
    return dests;
  };

  useEffect(() => {
    const config = {
      draggable: true,
      movable: {
        free: true, // Allow free movement for now
        showDests: true,
        events: {
          after: (from, to) => {
            const move = chess.move({ from, to });
            if (move) {
              console.log(`Moved from ${from} to ${to}`);
              setGround((prev) => {
                prev.set({ fen: chess.fen() }); // Update the board after the move
                return prev;
              });
            }
          },
          select: (square) => {
            const piece = chess.get(square);
            if (piece) {
              console.log(`Selected square: ${square}, Piece: ${piece.color}${piece.type}`);
            } else {
              console.log(`Empty square: ${square}`);
            }
          },
        },
      },
    };

    // Initialize Chessground if the reference is ready
    if (chessgroundRef.current && !ground) {
      const cg = Chessground(chessgroundRef.current, config);
      setGround(cg);
    }

    // Clean up Chessground instance on unmount
    return () => {
      if (ground) {
        ground.destroy();
      }
    };
  }, [chess, ground]);

  return (
    <div>
      <div ref={chessgroundRef} style={{ width: '400px', height: '400px' }}></div>
    </div>
  );
}
