import React, { useState, useEffect } from 'react';
import createBoard from '../util/createBoard';
import Cell from './Cell';
import { revealed } from '../util/reveal';
import Modal from './Modal';
// import Timer from './Timer';

const Board = () => {
    const [grid, setGrid] = useState([]);
    const [nonMineCount, setNonMineCount] = useState(0);
    const [mineLocations, setMineLocations] = useState([]);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        function freshBoard() {
            const newBoard = createBoard(10, 15, 15);
            const totalNonMines = 10 * 15 - 15;
            setNonMineCount(totalNonMines);
            setMineLocations(newBoard.mineLocation);
            setGrid(newBoard.board);
        }
        freshBoard();
    }, []);

    const updateFlag = (e, x, y) => {
        e.preventDefault();
        let newGrid = JSON.parse(JSON.stringify(grid));
        newGrid[x][y].flagged = !newGrid[x][y].flagged; // Toggle the flag
        setGrid(newGrid);
    };

    const revealCell = (x, y) => {
        if (grid[x][y].revealed || gameOver) {
            return;
        }
        let newGrid = JSON.parse(JSON.stringify(grid));
        if (newGrid[x][y].value === 'X') {
            alert('Mine found');
            for (let i = 0; i < mineLocations.length; i++) {
                newGrid[mineLocations[i][0]][mineLocations[i][1]].revealed = true;
            }
            setGrid(newGrid);
            setGameOver(true);
        } else {
            let newRevealedBoard = revealed(newGrid, x, y, nonMineCount);
            setGrid(newRevealedBoard.arr);
            if (newRevealedBoard.newNonMinesCount >= 0) {
                setNonMineCount(newRevealedBoard.newNonMinesCount);
                if (newRevealedBoard.newNonMinesCount === 0) {
                    setGameOver(true);
                }
            }

        }
    }

    return (
        <div>
            <p>Minesweeper</p>
            {/* <Timer /> */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
            }}>
                {gameOver && <Modal />}
                {grid.map((singleRow, index1) => {
                    return (
                        <div style={{ display: "flex" }} key={index1}>
                            {singleRow.map((singleBlock, index2) => {
                                return (
                                    <Cell
                                        revealCell={revealCell}
                                        details={singleBlock}
                                        updateFlag={updateFlag}
                                        key={index2}
                                    />
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Board;
