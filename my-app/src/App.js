// App.js
import React from 'react';
import GamePage from './pages/GamePage';
import './index.css';  // Import the Tailwind CSS

import ChessBoard from './components/ChessBoard';

const App = () => {
  return (
    <div className="App">
      <ChessBoard />
    </div>
  );
};

export default App;