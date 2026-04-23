import Player from './Player';
import Gameboard from './Gameboard';

test('Player has own gameboard', () => {
    const player = new Player('Human');
    expect(player.gameboard).toBeDefined(); // check value is not undefined. player.gameboard exists
     
});


// stress testing computer player to ensure it makes unique moves until the board is full and not stuck in an infinite loop when only one square is left.
test('Computer player makes a unique random move', () => {
    const computer = new Player('AI');
    const enemyBoard = new Gameboard();
    const moves = new Set(); // to track unique moves

    // simulate 100 moves (fill the whole board)
    for (let i=0; i < 100; i++) {
        const move = computer.makeRandomMove(enemyBoard);
        const coordString = `${move.x},${move.y}`;

        // check if move is unique. if coords already exists in moves set, test fails
        expect(moves.has(coordString)).toBe(false);

        moves.add(coordString); // add move to set


    }

    // check that we have 100 unique moves (the whole board)
    expect(moves.size).toBe(100);
})


