import Player from "./Player.js";
import Ship from "./Ship.js";
import { renderBoard } from "./domHandler.js";


// initialize players 
const player1 = new Player('Alice');
const player2 = new Player('Computer');


const statusEl = document.getElementById('game-status')

const resetBtn = document.getElementById('reset-btn')

const rotateBtn = document.getElementById('rotate-btn')

// global event listener
document.getElementById('reset-btn').addEventListener('click', () => {
            location.reload(); // simple way to reset the game
        });

let isVertical = false


rotateBtn.addEventListener('click', () => {
    isVertical = !isVertical;
    rotateBtn.innerText = `Rotation: ${isVertical ? 'Vertical' : 'Horizontal'}`;

});

// place ships for player 1
// player1.gameboard.placeShip(new Ship(4), 0,0, false);
// player1.gameboard.placeShip(new Ship(3), 2, 5, true); 




// place ships for player 2
// player2.gameboard.placeShip(new Ship(4), 5, 5, true);
// player2.gameboard.placeShip(new Ship(3), 1,1, false);

const computerShips = [5,4,3,3,2];
const shipsToPlace = [5,4,3,3,2];
let currentShipIndex = 0; // track which ship player is placing

// randomly place computer's ships
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


// listen for clicks on player's board
document.getElementById('player-board').addEventListener('click', (e) => {

   

    if (currentShipIndex >= shipsToPlace.length) return;
    const x = parseInt(e.target.dataset.x);
    const y = parseInt(e.target.dataset.y);
    if (isNaN(x) || isNaN(y)) return;

    try {
        const shipLength = shipsToPlace[currentShipIndex];
        player1.gameboard.placeShip(new Ship(shipLength), x, y, isVertical);

        currentShipIndex++;
        updateDisplay();

        // update instructions
        const remaining = shipsToPlace.length - currentShipIndex;
        if(remaining > 0) {
            statusEl.innerText = `PHASE 1: DEPLOYING... (${remaining} SHIPS REMAINING)`;
        } else {
            statusEl.innerText = 'PHASE 2: ALL SHIPS DEPLOYED. COMMENCE ATTACK!';
            statusEl.classList.replace('text-yellow-300', 'text-green-400')
            rotateBtn.classList.add('hidden');
            
        

        }
    }
        
    catch (error) {
        statusEl.innerText = "INVALID COORDINATES: SHIP OVERLAP OR OUT OF BOUNDS";
        setTimeout(()=> {
            if(currentShipIndex < shipsToPlace.length) {
                statusEl.innerText = `PHASE 1: DEPLOYING... (${shipsToPlace.length - currentShipIndex} SHIPS REMAINING)`;
            }
        }, 2000);

        }
        
    })

// listen for clicks on enemy's waters - battle phase
document.getElementById('computer-board').addEventListener('click', (e) => {

    if (player1.gameboard.allShipsSunk() || player2.gameboard.allShipsSunk()) {
        return; // game over, ignore clicks
    }

    const x = parseInt(e.target.dataset.x);
    const y = parseInt(e.target.dataset.y);

    if (isNaN(x) || isNaN(y)) return; // clicked outside of grid

     if (currentShipIndex < shipsToPlace.length) {
        statusEl.innerText= "ATTENTION: DEPLOY YOUR ENTIRE FLEET FIRST!";
        return;
    }

    const coords = `${x},${y}`;
  
    const isDuplicate = player2.gameboard.missedAttacks.includes(coords) || player2.gameboard.hits.includes(coords);

    // check if duplicate
    if (isDuplicate) {
        statusEl.innerText= "Square already attacked. Try another coordinate.";
        return;
    }
    

    
        // player's turn to attack
        const playerHit = player2.gameboard.receiveAttack(x,y);
        statusEl.innerText = `Player attacks (${x},${y}) - ${playerHit ? 'DIRECT HIT ON ENEMY SHIP!' : 'SHOT MISSED!'}`;
        statusEl.style.color = playerHit ? "#fca5a5" : "#f0a5fa";

        // computer's turn to attack
        if(!player2.gameboard.allShipsSunk()) {
            const computerMove = player2.makeRandomMove(player1.gameboard);
        

            // check player's board if hit or miss
            const computerHit = player1.gameboard.hits.includes(`${computerMove.x},${computerMove.y}`);


            setTimeout(() => { 
                if(!player2.gameboard.allShipsSunk() && !player1.gameboard.allShipsSunk()) {
                    statusEl.innerText = `Computer attacks (${computerMove.x},${computerMove.y}) - ${computerHit ? 'WARNING: OUR FLEET HAS BEEN HIT' : 'ENEMY FIRE MISSED OUR SHIPS.'}`;
                    statusEl.style.color = computerHit ? "#ef4444" : "#94a3b8";

                }
            }, 1000);
        }

        // re-render boards after each turn
        updateDisplay();
    
    

    

        // check for winner
        if (player2.gameboard.allShipsSunk()) {
            statusEl.innerText = "VICTORY! ALL ENEMY SHIPS HAVE BEEN SUNK!";
            statusEl.style.color = '#4ade80';
            statusEl.classList.add('animate-bounce')
            resetBtn.classList.remove('hidden');
        } else if (player1.gameboard.allShipsSunk()) {
            statusEl.innerText = "DEFEAT! ALL YOUR SHIPS HAVE BEEN SUNK!";
            statusEl.style.color = '#f87171';
            resetBtn.classList.remove('hidden');
        }
    
        
        

        
});