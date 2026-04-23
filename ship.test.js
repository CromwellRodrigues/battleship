import Ship from './ship';

test('ship increases hits when hit() is called', () => {
    const boat = new Ship(3);
    boat.hit();
    expect(boat.hits).toBe(1);
});