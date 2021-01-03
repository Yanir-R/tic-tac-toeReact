import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './Board'
import calculateWinner from './calculateWinner'

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    }
  }
  handleClick(i) {
    const history = this.state.history.slice(0 , this.state.stepNumber + 1)
    const current = history[history.length - 1];
    const squares = current.squares.slice(); // used slice() to create a new copy of the squares array after every move, this will allow us to store every past move of the squares array
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{ // concat() method doesn’t mutate the original array, I prefer it then push()
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    
    const moves = history.map((step, move) => {
      const desc = move ? 'go to move #' + move : 'Restart the game / Move list:';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
})

    let status;
    if (winner) {
      status = 'Winner:' + winner;
    } else {
      status = 'Next player' + (this.state.xIsNext ? 'X' : 'O');
    } 
 
    
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
