import {Stack} from './stack.js';

// Took a lot from snake for the grid

let maze1;
const route = new Stack();
let goalMet = false;

fetch ('maze.json') 
    .then(response => {
        if(!response.ok) {
            throw new Error("Error in line 6");
        }
        return response.json();
    }).then(data => {
        maze1 = data;
        //Functions here just because it needs to be called AFTER the fetch.
        createBoard(4, 4);
        visitCell(0,0);
    })


let cssVariables = document.querySelector(':root')

function tick() {
    setTimeout(tick, 10000)
    visitCell(0,0);
}

function createBoard(row, col) {
    console.log(maze1);
    const htmlGrid = document.getElementById("grid");

    for (let i = 0; i < maze1.rows; i++) {
        for (let j = 0; j < maze1.cols; j++) {
            maze1.maze[i][j].visited = false;
          const cell = document.createElement("div");
          cell.classList.add("cell");
          if (i === maze1.start.row && j === maze1.start.col) {
            cell.classList.add("start");
          }
          if (i === maze1.goal.row && j === maze1.goal.col) {
            cell.classList.add("goal");
          }
          
          for(let x = 0; x < 4; x++) {
            if (maze1.maze[i][j].north === true) {
                cell.classList.add("northWall"); 
                //console.log("north wall")// This runs
            }
            if (maze1.maze[i][j].south === true) {
                cell.classList.add("southWall"); 
                //console.log("north wall")// This runs
            }
            if (maze1.maze[i][j].west === true) {
                cell.classList.add("westWall"); 
                //console.log("north wall")// This runs
            }
            if (maze1.maze[i][j].east === true) {
                cell.classList.add("eastWall"); 
                //console.log("north wall")// This runs
            }
        }

          htmlGrid.appendChild(cell);
        }

    }
    cssVariables.style.setProperty('--grid-repeat', maze1.cols)
}

let its = 0;

function visitCell(row, col) { //Call itself recursively
    const cells = document.getElementById("grid").querySelectorAll(".cell");
    const specificCell = cells[row * maze1.rows + col];
    specificCell.classList.add("start")

    let cell = maze1.maze[row][col];
    const goal = maze1.goal;

    //I have a global variable for seeing if the goal is met

    //I USE NSEW

    //Mark cell as visited
    cell.visited = true;
    // HOW DO I MAKE THE COLOUR APPEAR?? IT NOW LOGS THAT IT GOES THE CORRECT WAY 

    //Push cell to route
    route.push(cell);
    console.log(route);

    //If goal -> Stop
    console.log("Row: " + cell.row + "Col: " + cell.col);
    if(cell.row === goal.row && cell.col === goal.col) {
        console.log("You reached the goal");
        return;
    }

    //If neighbours able to visit, visit them
    if (!cell.north && !maze1.maze[row-1][col].visited) {
        console.log("Go to north");
        visitCell(row-1, col);
    } else if (!cell.south && !maze1.maze[row+1][col].visited) {
        console.log("Go to south");
        visitCell(row+1, col);
    } else if (!cell.east && !maze1.maze[row][col+1].visited) {
        console.log("Go to east");
        visitCell(row, col+1);
    } else if (!cell.west && !maze1.maze[row][col-1].visited) {
        console.log("Go to west");
        visitCell(row, col-1);
    } else { //If no neighbours able to visit, backtrack/pop cell from route
        its++;
        //console.log("Start backtracking " + its)
        if(its > 30) return null;
        
        
        //visitCell(lastCell.row, lastCell.col);

        for (let i = 0; i < route.size(); i++) {
            route.pop(); //removes last item on stack and returns it

            if (route.size() === 0) {
                console.log("EMPTY STACK"); 
                return;
            } 

            const lastCell = route.peek().data; // Peek the last cell without removing it
            
            if (lastCell.row > 0 && !maze1.maze[lastCell.row - 1][lastCell.col].visited ||
                lastCell.row < maze1.rows - 1 && !maze1.maze[lastCell.row + 1][lastCell.col].visited ||
                lastCell.col > 0 && !maze1.maze[lastCell.row][lastCell.col - 1].visited ||
                lastCell.col < maze1.cols - 1 && !maze1.maze[lastCell.row][lastCell.col + 1].visited)
             {
                visitCell(lastCell.row, lastCell.col);
                return;
            } else {
                
            }
        }
        
    }

}



