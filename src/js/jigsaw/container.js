

export default class Container {
    constructor(board, tiles, x, y, offsetLeft, offsetTop) {
        this.board = board;
        this.tiles = tiles;
        this.el = document.createElement('div');
        this.el.style.top = `${y + offsetTop}px`;
        this.el.style.left = `${x + offsetLeft}px`;
        this.board.el.appendChild(this.el);
    }
}
