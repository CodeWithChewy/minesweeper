import React, { useState, useEffect } from 'react';
import createBoard from '../util/createBoard';
import Cell from './Cell';
import { revealed } from '../util/reveal';

const Board = () => {
    const [grid, setGrid] = useState([]);
    const [nonMineCount, setNonMineCount] = useState(0);
    const [mineLocations, setMineLocations] = useState([]);

    useEffect(() => {
        function freshBoard() {
            const newBoard = createBoard(10, 10, 15);
            const totalNonMines = 10 * 10 - 15;
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
        if (grid[x][y].revealed) {
            return;
        }
        let newGrid = JSON.parse(JSON.stringify(grid));
        if (newGrid[x][y].value === 'X') {
            alert('Mine found');
            for (let i = 0; i < mineLocations.length; i++) {
                newGrid[mineLocations[i][0]][mineLocations[i][1]].revealed = true;
            }
            setGrid(newGrid);
        } else {
            let newRevealedBoard = revealed(newGrid, x, y, nonMineCount);
            setGrid(newRevealedBoard.arr);
            if (newRevealedBoard.newNonMinesCount >= 0) {
                setNonMineCount(newRevealedBoard.newNonMinesCount);
            }

        }
    }

    return (
        <div>
            <p>{nonMineCount}</p>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
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
