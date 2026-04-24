

export const renderBoard = (containerId, gameboard, isEnemy=false) => {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // clear previous board 

    // create 10x10 grid
    for (let y=0; y <10; y++) {
        for (let x=0; x <10; x++) {


            // create tiny cell for each coordinate
            const cell = document.createElement('div');
            cell.classList.add('bg-blue-500', 'cursor-pointer', 'hover:bg-blue-400', 'border', 'border-gray-300');


            // hidden label - I am square(2,4)
            cell.dataset.x = x;
            cell.dataset.y = y;

            
            const coord = `${x},${y}`;

            // check for misses (gray circle)
            if (gameboard.missedAttacks.includes(coord)) {
                cell.classList.replace('bg-blue-500', 'bg-slate-100');
                cell.innerHTML = '<div class="w-2 h-2 bg-slate-400 rounded-full m-auto mt-3"></div>';
            }


            // check for hits (red circle)
            // check if there is a ship at the given coord
            // checks if the ship at that coord has a hits property greater than 0, meaning it has been hit at least once
            else if (gameboard.hits.includes(coord)) {
                cell.classList.replace('bg-blue-500', 'bg-red-500');

            }


            // show players own ships (green squares)
            else if (!isEnemy && gameboard.board[coord]) {
                cell.classList.replace('bg-blue-500', 'bg-green-500');
            }

            container.appendChild(cell);
        }
    }
}



