# minesweeper
Getting Started
We will have 3 components.

Cell : The cell component renders a cell div that represents each square in the board.
Board: The board component renders a 10x10 board containing a total of 100 cells and 10 of the cells will contain mines.
Game: The game component renders the board component.

# Rules of the game

- The goal of the game is to find all the mines on the board.
- You reveal mines by clicking the cells, if you reveal a mine you lose.
- If you reveal a cell without mine it will show number of mines surrounding the cell.
- You can flag a field by right clicking it.
- You win the game if you are able to reveal all the cells that is not a mine or you have flagged all the cells that is a mine.
