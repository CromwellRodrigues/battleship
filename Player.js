import Gameboard from "./Gameboard";

export default class Player {
    constructor(name) {
        this.name = name;
        this.gameboard = new Gameboard();
        this.movesMade = new Set();


    }


    makeRandomMove(enemyBoard) {
        let x, y;
        let coords;

        // keep generating random coordinates until we get a unique move
        do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
            coords = `${x},${y}`;
        }
        while (this.movesMade.has(coords));

        this.movesMade.add(coords);
        enemyBoard.receiveAttack(x,y);
        return {x,y};
    }
}