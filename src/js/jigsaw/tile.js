import Container from './container';

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
        this.containerTopOffset = 0;
        this.containerLeftOffset = 0;

        this.svgEl = document.createElementNS(svgNS, 'svg');
        this.svgEl.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
        this.svgEl.style.position = 'absolute';

        this.rectEl = document.createElementNS(svgNS, 'rect');
        this.rectEl.setAttribute('x', `-${col * this.board.tileWidth}`);
        this.rectEl.setAttribute('y', `-${row * this.board.tileHeight}`);
        this.rectEl.setAttribute('height', this.board.height);
        this.rectEl.setAttribute('width', this.board.width);
        this.rectEl.setAttribute('fill', 'url(#img1)');
        this.rectEl.setAttribute('clip-path', `url(#tile${this.top ? '-top' : ''}${this.bot ? '-bot' : ''}${this.left ? '-left' : ''}${this.right ? '-right' : ''})`);
        this.rectEl.style.pointerEvents = 'auto';
        this.svgEl.appendChild(this.rectEl);

        const pathEl = document.createElementNS(svgNS, 'use');
        pathEl.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#tile-path${this.top ? '-top' : ''}${this.bot ? '-bot' : ''}${this.left ? '-left' : ''}${this.right ? '-right' : ''}`);
        this.svgEl.appendChild(pathEl);

        this.setContainer(new Container(board, [this], row, col, row * (this.board.tileWidth + 20), col * (this.board.tileHeight + 20)), 0, 0);
    }

    setContainer(container, topOffsetDiff, leftOffsetDiff) {
        this.container = container;
        this.containerTopOffset += topOffsetDiff;
        this.containerLeftOffset += leftOffsetDiff;
        this.svgEl.style.top = `${this.containerTopOffset}px`;
        this.svgEl.style.left = `${this.containerLeftOffset}px`;
        this.container.el.appendChild(this.svgEl);
        this.rectEl.removeEventListener('mousedown', this.handleMousedown);
        this.rectEl.removeEventListener('mouseup', this.handleMouseup);
        this.handleMousedown = e => this.board.startDrag.call(this.board, e, this.container);
        this.handleMouseup = e => this.board.cancelDrag.call(this.board, e, this.container);
        this.rectEl.addEventListener('mousedown', this.handleMousedown);
        this.rectEl.addEventListener('mouseup', this.handleMouseup);
    }

    getCoords() {
        return {
            top: this.containerTopOffset + this.container.top,
            left: this.containerLeftOffset + this.container.left
        };
    }

    getDistanceTo(other) {
        return Math.abs(Math.abs(this.getCoords().top - other.getCoords().top) - (this.board.tileHeight * Math.abs(this.row - other.row)))
            + Math.abs(Math.abs(this.getCoords().left - other.getCoords().left) - (this.board.tileWidth * Math.abs(this.col - other.col)));
    }
}
