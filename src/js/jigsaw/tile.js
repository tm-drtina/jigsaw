import Container from './container';

const svgNS = 'http://www.w3.org/2000/svg';

export default class Tile {
    constructor(board, x, y, width, height, offsetLeft, offsetTop, top = false, bot = false, left = false, right = false) {
        this.board = board;
        this.container = new Container(board, [this], x, y, offsetLeft, offsetTop);

        const svgEl = document.createElementNS(svgNS, 'svg');
        svgEl.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
        svgEl.setAttribute('clip-path', `url(#tile${top ? '-top' : ''}${bot ? '-bot' : ''}${left ? '-left' : ''}${right ? '-right' : ''})`);
        this.container.el.appendChild(svgEl);

        svgEl.addEventListener('mousedown', e => board.startDrag.call(board, e, this.container));
        svgEl.addEventListener('mouseup', e => board.cancelDrag.call(board, e, this.container));

        const rectEl = document.createElementNS(svgNS, 'rect');
        rectEl.setAttribute('x', `-${x}`);
        rectEl.setAttribute('y', `-${y}`);
        rectEl.setAttribute('height', height);
        rectEl.setAttribute('width', width);
        rectEl.setAttribute('fill', 'url(#img1)');
        svgEl.appendChild(rectEl);

        const pathEl = document.createElementNS(svgNS, 'use');
        pathEl.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#tile-path${top ? '-top' : ''}${bot ? '-bot' : ''}${left ? '-left' : ''}${right ? '-right' : ''}`);
        svgEl.appendChild(pathEl);
    }
}
