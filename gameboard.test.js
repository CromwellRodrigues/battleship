import Gameboard from './Gameboard';
import Ship from './Ship';

test('Gameboard places ship at specific coordinates', () => {
    const board = new Gameboard();
    const ship = new Ship(2);
    board.placeShip(ship, 0, 0);

    // check if the board's internal map has a ship at 0,0
    expect(board.board['0,0']).toBe(ship);
    
})