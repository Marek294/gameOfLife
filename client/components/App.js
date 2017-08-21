import React from 'react';
import { Button, Modal, Form, FormControl, FormGroup, Col } from 'react-bootstrap';
import classnames from 'classnames';

require("!style-loader!css-loader!sass-loader!../sass/_App.scss");

class App extends React.Component {
    constructor(props) {
        super(props);

        let rows = 3;
        let columns = 5;

        let board = Array(rows).fill().map(() => Array(columns).fill(0))

        this.state = {
            rows: rows,
            columns: columns,
            msSpeed: 200,
            board: board,
            run: false,
            showModal: false,
        };

        this.click = this.click.bind(this);
        this.run = this.run.bind(this);
        this.timer = this.timer.bind(this);
        this.doMath = this.doMath.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.save = this.save.bind(this);
        this.change = this.change.bind(this);
    }

    componentDidMount() {
        setInterval(this.timer, this.state.msSpeed);
    }

    click(x, y) {
        let board = this.state.board;
        if(board[x][y] === 1) board[x][y] = 0;
        else board[x][y] = 1;
        this.setState({
            board: board
        });
    }

    run(){
        this.setState({
            run: true
        });
    }

    stop() {
        this.setState({
            run: false
        });
    }

    timer() {
        if(this.state.run) this.doMath();
    }

    doMath() {
        let board = this.state.board;
        let tmpBoard = Array(this.state.rows).fill().map(() => Array(this.state.columns).fill(0))

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

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({
            showModal: true,
            inputRows: this.state.rows,
            inputColumns: this.state.columns,
            inputMsSpeed: this.state.msSpeed,
        });
    }

    save() {
        let board = Array(this.state.inputRows).fill().map(() => Array(this.state.inputColumns).fill(0))
        this.setState({
            rows: this.state.inputRows,
            columns: this.state.inputColumns,
            board: board,
            msSpeed: this.state.inputMsSpeed,
        });
        this.close();
    }

    change(e) {
        this.setState({
            [e.target.name]: parseInt(e.target.value)
        });
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
                <div className="buttons">
                    <button onClick={() => this.run()}>Run</button>
                    <button onClick={() => this.stop()}>Stop</button>
                    <button onClick={() => this.open()}>Change Settings</button>
                </div>
                <div>
                    <Button
                        bsStyle="primary"
                        bsSize="large"
                        onClick={() => this.open()}
                    >
                        Launch demo modal
                    </Button>

                    <Modal show={this.state.showModal} onHide={this.close}>
                        <Modal.Header>
                            <Modal.Title>Settings</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form horizontal>
                                <FormGroup controlId="formHorizontalText">
                                    <Col sm={3}>
                                        Rows
                                    </Col>
                                    <Col sm={9}>
                                        <FormControl name="inputRows" type="text" placeholder="Rows" value={this.state.inputRows} onChange={this.change} />
                                    </Col>
                                </FormGroup>

                                <FormGroup controlId="formHorizontalText">
                                    <Col sm={3}>
                                        Columns
                                    </Col>
                                    <Col sm={9}>
                                        <FormControl name="inputColumns" type="text" placeholder="Columns" value={this.state.inputColumns} onChange={this.change} />
                                    </Col>
                                </FormGroup>

                                <FormGroup controlId="formHorizontalText">
                                    <Col sm={3}>
                                        Speed in ms
                                    </Col>
                                    <Col sm={9}>
                                        <FormControl name="inputMsSpeed" type="text" placeholder="Speed" value={this.state.inputMsSpeed} onChange={this.change} />
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.close}>Close</Button>
                            <Button bsStyle="primary" type="submit" onClick={this.save}>Save Settings</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default App;