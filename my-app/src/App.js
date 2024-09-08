import React, { useEffect, useRef } from 'react';
import { Chessground } from 'chessground'; // Named import

import './chessground-assets/chessground.base.css';
import './chessground-assets/chessground.brown.css';
import './chessground-assets/chessground.cburnett.css';

export default function App() {
  const chessgroundRef = useRef(null);

  useEffect(() => {
    // Initialize the Chessground board with config and mount it to the div
    const config = {}; // Add any configuration you need
    const ground = Chessground(chessgroundRef.current, config);

    // Clean up when component unmounts
    return () => {
      ground.destroy();
    };
  }, []);

  return (
    <div>
      {/* Render the chessboard inside this div */}
      <div ref={chessgroundRef} style={{ width: '400px', height: '400px' }}></div>
    </div>
  );
}
