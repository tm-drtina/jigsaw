const svgNS = 'http://www.w3.org/2000/svg';

export default class Tile {
    constructor(board, row, col) {
        this.board = board;
        this.row = row;
        this.col = col;
        this.neighbors = new Set();
        this.top = row === 0;
        this.bot = row === this.board.rows - 1;
        this.left = col === 0;
        this.right = col === this.board.cols - 1;

        this.svgEl = document.createElementNS(svgNS, 'svg');
        this.svgEl.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
        this.svgEl.setAttribute('height', `${this.board.tileSizeTotalScaled()}`);
        this.svgEl.setAttribute('width', `${this.board.tileSizeTotalScaled()}`);
        this.svgEl.setAttribute('viewBox', `-1 -1 ${this.board.tileSizeTotal} ${this.board.tileSizeTotal}`);
        this.svgEl.style.position = 'absolute';

        this.backgroundFill = document.createElementNS(svgNS, 'rect');
        this.backgroundFill.setAttribute('height', `${this.board.tileSizeTotal}`);
        this.backgroundFill.setAttribute('width', `${this.board.tileSizeTotal}`);
        this.backgroundFill.setAttribute('fill', 'black');
        this.backgroundFill.setAttribute('clip-path', `url(#tile${this.top ? '-top' : ''}${this.bot ? '-bot' : ''}${this.left ? '-left' : ''}${this.right ? '-right' : ''})`);
        this.backgroundFill.style.pointerEvents = 'auto';
        this.svgEl.appendChild(this.backgroundFill);

        this.rectEl = document.createElementNS(svgNS, 'rect');
        this.rectEl.setAttribute('x', `${-(col * this.board.tileSize) + this.board.leftOffset}`);
        this.rectEl.setAttribute('y', `${-(row * this.board.tileSize) + this.board.topOffset}`);
        this.rectEl.setAttribute('height', `${Math.floor(this.board.height / this.board.scale)}`);
        this.rectEl.setAttribute('width', `${Math.floor(this.board.width / this.board.scale)}`);
        this.rectEl.setAttribute('fill', 'url(#img1)');
        this.rectEl.setAttribute('clip-path', `url(#tile${this.top ? '-top' : ''}${this.bot ? '-bot' : ''}${this.left ? '-left' : ''}${this.right ? '-right' : ''})`);
        this.rectEl.style.pointerEvents = 'auto';
        this.svgEl.appendChild(this.rectEl);

        const pathEl = document.createElementNS(svgNS, 'use');
        pathEl.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#tile-path${this.top ? '-top' : ''}${this.bot ? '-bot' : ''}${this.left ? '-left' : ''}${this.right ? '-right' : ''}`);
        this.svgEl.appendChild(pathEl);
    }

    resize() {
        this.svgEl.setAttribute('height', `${this.board.tileSizeTotalScaled()}`);
        this.svgEl.setAttribute('width', `${this.board.tileSizeTotalScaled()}`);
        this.svgEl.style.top = `${this.rowInContainer * this.board.tileSizeScaled()}px`;
        this.svgEl.style.left = `${this.colInContainer * this.board.tileSizeScaled()}px`;
    }

    setContainer(container, rowInContainer = 0, colInContainer = 0) {
        this.container = container;
        this.rowInContainer = rowInContainer;
        this.colInContainer = colInContainer;
        this.resize();
        this.container.el.appendChild(this.svgEl);
    }

    getCoords() {
        return {
            top: (this.rowInContainer * this.board.tileSizeScaled()) + this.container.top,
            left: (this.colInContainer * this.board.tileSizeScaled()) + this.container.left
        };
    }

    getDistanceTo(other) {
        return Math.abs(Math.abs(this.getCoords().top - other.getCoords().top) - (this.board.tileSizeScaled() * Math.abs(this.row - other.row)))
            + Math.abs(Math.abs(this.getCoords().left - other.getCoords().left) - (this.board.tileSizeScaled() * Math.abs(this.col - other.col)));
    }
}
