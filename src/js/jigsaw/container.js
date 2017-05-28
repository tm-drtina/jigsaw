

export default class Container {
    constructor(board, tiles, row, col, initTop, initLeft) {
        this.board = board;
        this.tiles = tiles;
        this.row = row;
        this.col = col;
        this.el = document.createElement('div');
        this.el.style.pointerEvents = 'none';
        this.setPos(initTop, initLeft);
        this.board.el.appendChild(this.el);
    }

    setPos(top, left) {
        this.top = top;
        this.left = left;
        this.el.style.top = `${top}px`;
        this.el.style.left = `${left}px`;
    }
}
