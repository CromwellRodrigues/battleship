import Gameboard from './Gameboard';
import Ship from './Ship';

test('Gameboard places ship at specific coordinates', () => {
    const board = new Gameboard();
    const ship = new Ship(2);
    board.placeShip(ship, 0, 0);

    // check if the board's internal map has a ship at 0,0
    expect(board.board['0,0']).toBe(ship);

})

// goal: receive attack logic
test('Gameboard receiveAttack calls hit() on a ship if hit', () => {
    const board = new Gameboard();
    const ship = new Ship(2);
    board.placeShip(ship, 0, 0);
    board.receiveAttack(0, 0);
    expect(ship.hits).toBe(1);
})


test('all ShipsSunk returns true when all ships are sunk', () => {
    const board = new Gameboard();
    const ship1 = new Ship(1);
    const ship2 = new Ship(1);

    board.placeShip(ship1, 0, 0);
    board.placeShip(ship2, 5, 5);

    board.receiveAttack(0, 0); //sinks ship1
    board.receiveAttack(5, 5); //sinks ship2

    expect(board.allShipsSunk()).toBe(true);
})