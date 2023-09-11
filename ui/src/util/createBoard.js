// Function to generate a Minesweeper board
export default function generateMinesweeperBoard(row, column, bombs) {
    const board = [];
    const mineLocation = [];

    // Validate input parameters
    if (row <= 0 || column <= 0 || bombs <= 0 || bombs >= row * column) {
        throw new Error("Invalid input parameters for generating Minesweeper board.");
    }

    // Constants
    const BOMB = "X";

    // Function to generate a random number between min and max (inclusive)
    function randomNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // Create a blank board
    for (let x = 0; x < row; x++) {
        const subCol = [];
        for (let y = 0; y < column; y++) {
            subCol.push({
                value: 0,
                revealed: false,
                x: x,
                y: y,
                flagged: false,
            });
        }
        board.push(subCol);
    }

    let bombsCount = 0;

    // Place bombs randomly on the board
    while (bombsCount < bombs) {
        const x = randomNum(0, row - 1);
        const y = randomNum(0, column - 1);

        if (board[x][y].value === 0) {
            board[x][y].value = BOMB;
            mineLocation.push([x, y]);
            bombsCount++;
        }
    }

    // Calculate the number of neighboring bombs for each cell
    for (let roww = 0; roww < row; roww++) {
        for (let coll = 0; coll < column; coll++) {
            if (board[roww][coll].value === BOMB) {
                continue;
            }
            //Define the neighboring positions
            const neighbors = [
                [-1, -1], [-1, 0], [-1, 1],
                [0, -1], /* Current Cell */[0, 1],
                [1, -1], [1, 0], [1, 1]
            ];

            let neighboringBombs = 0;

            // Check each neighboring position
            for (const [dx, dy] of neighbors) {
                const newRow = roww + dx;
                const newCol = coll + dy;

                // Check if the neighboring cell is within the board bounds
                if (newRow >= 0 && newRow < row && newCol >= 0 && newCol < column) {
                    // Check if the neighboring cell contains a bomb
                    if (board[newRow][newCol].value === BOMB) {
                        neighboringBombs++;
                    }
                }
            }

            // Set the number of neighboring bombs for the current cell
            board[roww][coll].value = neighboringBombs;
        }
    }


    return { board, mineLocation };
}
