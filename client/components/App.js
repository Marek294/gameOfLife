import React from 'react';
import classnames from 'classnames';

require("!style-loader!css-loader!sass-loader!../sass/_App.scss");

class App extends React.Component {
    constructor(props) {
        super(props);

        let rows = 30;
        let columns = 50;

        let board = Array(rows).fill().map(() => Array(columns).fill(0))

        this.state = {
            rows: rows,
            columns: columns,
            board: board
        }

        this.click = this.click.bind(this);
        this.run = this.run.bind(this);
    }

    click(x, y) {
        let board = this.state.board;
        board[x][y] = 1;
        this.setState({
            board: board
        });
    }

    run(){
        let board = this.state.board;
        let tmpBoard = Array(30).fill().map(() => Array(50).fill(0))

        for(let x = 0; x < this.state.rows; x++) {
            for(let y = 0; y < this.state.columns; y++) {
                let count = this.countNeighbours(x, y);
                if(!board[x][y] && count === 3) tmpBoard[x][y] = 1;
                if(board[x][y] && ( count < 2 || count > 3 )  ) tmpBoard[x][y] = 0;
                if(board[x][y] && ( count === 2 || count === 3 )  ) tmpBoard[x][y] = 1;
            }
        }

        this.setState({
            board: tmpBoard
        });
    }

    countNeighbours(x, y) {
        let board = this.state.board;

        let count = 0;

        if(board[x-1] && board[x-1][y]) count++;
        if(board[x-1] && board[x-1][y+1]) count++;
        if(board[x-1] && board[x-1][y-1]) count++;
        if(board[x][y-1]) count++;
        if(board[x][y+1]) count++;
        if(board[x+1] && board[x+1][y-1]) count++;
        if(board[x+1] && board[x+1][y]) count++;
        if(board[x+1] && board[x+1][y+1]) count++;

        return count;
    }

    render() {
        let columns = Array(this.state.columns).fill();
        let rows = Array(this.state.rows).fill();

        let board = this.state.board;

        rows = rows.map((value, x) => {
            columns = columns.map((value, y) => {
                let style;

                if(board[x][y] === 1) {
                    style = "child";
                }

                return (
                    <td key={y} className={style} onClick={() => this.click(x, y)}></td>
                )
            });
            return (
                <tr key={x}>
                    {columns}
                </tr>
            )
        });

        return (
            <div className="game">
                <div className="title">
                    <h1>Game of Life</h1>
                </div>
                <div className="board">
                    <table>
                        {rows}
                    </table>
                </div>
                <button onClick={() => this.run()}>Run</button>
            </div>
        );
    }
}

export default App;