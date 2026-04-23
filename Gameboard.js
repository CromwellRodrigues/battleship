export default class Gameboard {
    constructor() {
        this.board = {};
        this.missedAttacks = [];
    }

    placeShip(ship,x,y) {
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
}