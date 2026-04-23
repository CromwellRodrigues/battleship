import Player from "./Player.js";
import Ship from "./Ship.js";
import { renderBoard } from "./domHandler.js";


// initialize players 
const player1 = new Player('Alice');
const player2 = new Player('Computer');


const computerShips = [5,4,3,3,2];


// place ships for player 1
player1.gameboard.placeShip(new Ship(4), 0,0, false);
player1.gameboard.placeShip(new Ship(3), 2, 5, true); 




// place ships for player 2
// player2.gameboard.placeShip(new Ship(4), 5, 5, true);
// player2.gameboard.placeShip(new Ship(3), 1,1, false);


computerShips.forEach(length => {
    let placed = false;
    while(!placed) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const isVertical = Math.random() > 0.5;

        // check if ship can be placed at the generated coordinates
        try {
            player2.gameboard.placeShip(new Ship(length), x, y, isVertical);
            placed = true; // exit loop if placement is successful
        }
        catch (e) {
            // if placement fails (e.g., out of bounds or overlap), catch the error and try again
            console.log(`Failed to place ship of length ${length} at (${x},${y}) - trying again.`);
        }
    }
})

// render initial boards

const updateDisplay = () => {
    renderBoard('player-board', player1.gameboard);
    renderBoard('computer-board', player2.gameboard, true);
}

updateDisplay();


// listen for clicks on enemy's waters
document.getElementById('computer-board').addEventListener('click', (e) => {
    const x = parseInt(e.target.dataset.x);
    const y = parseInt(e.target.dataset.y);

    if (isNaN(x) || isNaN(y)) return; // clicked outside of grid

    const coords = `${x},${y}`;

    // check if duplicate
    const isDuplicate = player2.gameboard.missedAttacks.includes(coords) || player2.gameboard.hits.includes(coords);

    if (!isDuplicate) {
        // player's turn to attack
        const playerHit = player2.gameboard.receiveAttack(x,y);
        console.log(`Player attacks (${x},${y}) - ${playerHit ? 'Hit!' : 'Miss!'}`);

        // computer's turn to attack
        if(!player2.gameboard.allShipsSunk()) {
            const computerMove = player2.makeRandomMove(player1.gameboard);
        

            // check player's board if hit or miss
            const computerHit = player1.gameboard.hits.includes(`${computerMove.x},${computerMove.y}`);
            console.log(`Computer attacks (${computerMove.x},${computerMove.y}) - ${computerHit ? 'Hit!' : 'Miss!'}`);

        }

        // re-render boards after each turn
        updateDisplay();
    
    

    

        // check for winner
        if (player2.gameboard.allShipsSunk()) {
            alert("Congrats! You win!");
        } else if (player1.gameboard.allShipsSunk()) {
            alert("Computer wins! Better luck next time.");
        }
    }
        else {
            console.log("Square already attacked. Try again.");
        }
        
});