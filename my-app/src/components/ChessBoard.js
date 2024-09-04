// src/components/ChessBoard.js
import React from 'react';
import './ChessBoard.css'; // Importing CSS file for styling

const ChessBoard = () => {
  const board = [
    ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
    ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
  ];

  return (
    <div className="chessboard">
      {board.flat().map((piece, index) => (
        <div key={index} className="square">
          <span className="piece">{piece}</span>
        </div>
      ))}
    </div>
  );
};

export default ChessBoard;
