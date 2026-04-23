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

}