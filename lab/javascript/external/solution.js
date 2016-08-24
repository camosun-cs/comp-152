// Define a function to compute the next step in the Game Of Life simulation
function updateCells(oldCells) {
    // Create an new grid with the same dimensions as oldCells
    var newCells = GameOfLife.createGrid(oldCells.length);
    // Declare variables to keep track of our position in the grid and the number of alive neighbours
    var row, col, neighbours;
    // For each row of the grid...
    for(row=1; row < oldCells.length-1; row++) {
        // For each column in the current row...
        for(col=1; col < oldCells[row].length-1; col++) {
            // Count the number of alive cells neighbouring the current cell
            neighbours = oldCells[row-1][col-1] + oldCells[row-1][col] + oldCells[row-1][col+1]; // above
            neighbours += (oldCells[row][col-1] + oldCells[row][col+1]); // left and right
            neighbours += (oldCells[row+1][col-1] + oldCells[row+1][col] + oldCells[row+1][col+1]); // and below
            // If there are less than 2 or more than 3 alive neighbours...
            if(neighbours < 2 || neighbours > 3) {
                // The current cell dies
                newCells[row][col] = 0;
            }
            // If there are exactly 3 alive neighbours…
            if(neighbours == 3){
                // The current cell becomes (or stays) alive
                newCells[row][col] = 1;
            }
            // If there are exactly 2 alive neighbours…
            if(neighbours == 2){
                // The current cell stays in its previous state
                newCells[row][col] = oldCells[row][col];
            }
        }
    }
    // Return the new grid of cells
    return newCells;
}
function updateCellsImproved(oldCells) {
    var newCells = GameOfLife.createGrid(oldCells.length);
    var row, col, neighbours, prevR, nextR, prevC, nextC;
    // For each row of the grid...
    for(row=0; row < oldCells.length; row++) {
        // For each column in the current row...
        for(col=0; col < oldCells[row].length; col++) {
            // Count the number of alive cells neighbouring the current cell
            prevR = (row-1+oldCells.length)%oldCells.length;
            nextR = (row+1+oldCells.length)%oldCells.length;
            prevC = (col-1+oldCells[row].length)%oldCells[row].length;
            nextC = (col+1+oldCells[row].length)%oldCells[row].length;
            neighbours = oldCells[prevR][prevC] + oldCells[prevR][col] + oldCells[prevR][nextC]; // above
            neighbours += (oldCells[row][prevC] + oldCells[row][nextC]); // left and right
            neighbours += (oldCells[nextR][prevC] + oldCells[nextR][col] + oldCells[nextR][nextC]); // and below
            // If there are less than 2 or more than 3 alive neighbours...
            if (neighbours < 2 || neighbours > 3) {
                // The current cell dies
                newCells[row][col] = 0;
            }
            // If there are exactly 3 alive neighbours…
            else if (neighbours == 3) {
                // The current cell becomes (or stays) alive
                newCells[row][col] = 1;
            }
            // If there are exactly 2 alive neighbours…
            else {
                // The current cell stays in its previous state
                newCells[row][col] = oldCells[row][col];
            }
        }
    }
    // Return the new grid of cells
    return newCells;
}
