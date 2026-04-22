// Your ‘ships’ will be objects that include their length, the number of times they’ve been hit and whether or not they’ve been sunk.


export default class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
        this.sunk = false;
    }

    hit() {
        this.hits += 1;
    }

    isSunk() {
        return this.hits >= this.length;
        }

    }
