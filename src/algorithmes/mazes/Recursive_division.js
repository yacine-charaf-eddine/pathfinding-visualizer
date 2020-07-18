export function recursiveDivision(grid) {
    let chamber = [];
    let horizontalWall = []
    let verticalWall = []
    let horizontalPoint = Math.floor((Math.random() * (grid.length - 2)) + 2);
    let verticalPoint = Math.floor((Math.random() * (grid[horizontalPoint].length - 2)) + 2);
    for (let row = 2; row < grid.length - 2; row++) {
        for (let col = 2; col < grid[row].length - 2; col++) {
            if (row === horizontalPoint) {
                horizontalWall.push(grid[horizontalPoint][col])
            }
            if (col === verticalPoint) {
                verticalWall.push(grid[row][verticalPoint])
            }
        }
    }
    chamber = [...horizontalWall, ...verticalWall];
    return chamber;
}

export function createChamber(grid) {
    let chamber = [];
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (row === 0) {
                chamber.push(grid[row][col]);
            }
            if (row === grid.length - 1) {
                chamber.push(grid[row][col]);
            }
        }
        if (row > 0 && row < grid.length - 1) {
            chamber.push(grid[row][0]);
            chamber.push(grid[row][grid[row].length - 1]);
        }
    }
    return chamber;
}