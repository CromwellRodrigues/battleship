export default class Gameboard {
    constructor() {
        this.board = {};
        this.ships =[]; // list of ships placed
        this.missedAttacks = [];
        this.hits = []; 
    }

    placeShip(ship,x,y, isVertical=false) {

        //check if ship goes off the 10x10 board
        if (isVertical) {
            if (y + ship.length > 10) {
                throw new Error('Ship goes off board');
            }
        } else {
            if (x + ship.length > 10) {
                throw new Error('Ship goes off board');
            }
        }

        // check for overlap with existing ships
        for (let i = 0; i < ship.length; i++) {
            const currentX = isVertical ? x : x + i;
            const currentY = isVertical ? y + i : y;
            if (this.board[`${currentX},${currentY}`]) {
                throw new Error('Ship overlaps with existing ship');
            }

        }

        // if we made it here, the ship can be placed without going off board or overlapping
        this.ships.push(ship); // add ship to list of ships
        for (let i=0; i < ship.length; i++) {
            // horizontal placement for now
            const currentX = isVertical ? x : x + i;
            const currentY = isVertical ? y + i : y;
            
            this.board[`${currentX},${currentY}`] = ship; 
           
        }
    }


    receiveAttack(x,y) {
        const coords = `${x},${y}`;


        // prevent attacking same spot twice
        if(this.missedAttacks.includes(coords) || this.hits.includes(coords)) {
            return false; // invalid move
        }

        if (this.board[coords]) {
            this.board[coords].hit();
            this.hits.push(coords);
            return true;
        } else {
            this.missedAttacks.push(coords);
            return false;
        }
    }

    allShipsSunk() {
        //check every ship in our list  of ships
        return this.ships.every(ship => ship.isSunk());
    }
}