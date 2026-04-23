export default class Gameboard {
    constructor() {
        this.board = {};
        this.ships =[]; // list of ships placed
        this.missedAttacks = [];
    }

    placeShip(ship,x,y) {
        this.ships.push(ship); // add ship to list of ships
        for (let i=0; i < ship.length; i++) {
            // horizontal placement for now
            this.board[`${x+i},${y}`] = ship; 
        }
    }


    receiveAttack(x,y) {
        const coords = `${x},${y}`;
        if (this.board[coords]) {
            this.board[coords].hit();
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