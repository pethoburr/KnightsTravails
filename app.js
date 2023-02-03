const contentEl = document.getElementById('content');
const board = document.createElement('div');
board.id = 'board';
for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        const square = document.createElement('div');
        square.id = 'square';
        if ((i + j) % 2 == 0) {
            square.style.backgroundColor = '#808080';
        }
        board.appendChild(square); 
    } 
}
contentEl.appendChild(board);
const directions = [[1,2],[2,1],[2,-1],[1,-2],[-1,-2],[-2,-1],[-2,1],[-1,2]];

class knight {
    constructor(row, col, distanceFromStart, parent = null) {
        this.row = row;
        this.col = col;
        this.distanceFromStart = distanceFromStart;
        this.parent = parent;
    }

    getPositionString() {
        return `${this.row}, ${this.col}`;
    }
}

const getNeighbors = (row, col) => {
    const neighbors = [];
    for (const direction of directions) {
        const [rowChange, colChange] = direction;
        const neighborRow = row + rowChange;
        const neighborCol = col + colChange;
        neighbors.push([neighborRow, neighborCol]);
    }
    return neighbors;
};

function knightMoves([i, j], [x , y]) {
    const queue = [];
    const startNode = new knight(i, j, 0);
    queue.push(startNode);
    const visited = new Set();
    let parent = new Map();
    while (queue.length > 0) {
        let node = queue.shift();
        const { row, col, distanceFromStart } = node;
        if ( row === x && col === y) {
            let path = [];
            while (node !== startNode) {
                path.unshift(node);
                node = parent.get(node);
            }
            path.unshift(startNode);
            console.log('found it');
            console.log(path);
            console.log(distanceFromStart);
            return;
        }
        visited.add(node.getPositionString());      

        for (const neighbor of getNeighbors(row, col)) {
            const [neighborRow, neighborCol] = neighbor;
            const neighborNode = new knight(neighborRow, neighborCol, distanceFromStart + 1);
            if( row < 7 && row > -7 && col < 7 && col > -7) {
                if (visited.has(neighborNode.getPositionString())) {
                    continue
                };
                queue.push(neighborNode);
                parent.set(neighborNode, node);
            } 
        }
    }
}

