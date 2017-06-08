import { throttle } from 'lodash';

let passiveSupported = false;

try {
    const options = Object.defineProperty({}, 'passive', {
        get: () => {
            passiveSupported = true;
        }
    });

    window.addEventListener('test', null, options);
} catch (err) {}

export default class Container {
    constructor(board, tiles, row, col, maxRow, maxCol, initTop, initLeft) {
        this.board = board;
        this.tiles = tiles;
        this.row = row;
        this.col = col;
        this.maxRow = maxRow;
        this.maxCol = maxCol;
        this.deleted = false;
        this.el = document.createElement('div');
        this.el.style.pointerEvents = 'none';
        this.setPos(initTop, initLeft);
        this.board.el.appendChild(this.el);

        this.el.addEventListener('mousedown', this.handleDragStart);
        this.el.addEventListener('touchstart', this.handleDragStart);
    }

    prevTop = 0;
    prevLeft = 0;
    startX = 0;
    startY = 0;

    handleDragStart = (e) => {
        if (e.type === 'touchstart') {
            if (e.touches.length !== 1) return;
            this.startX = e.touches[0].clientX;
            this.startY = e.touches[0].clientY;
        } else {
            this.startX = e.clientX;
            this.startY = e.clientY;
        }
        this.prevLeft = this.left;
        this.prevTop = this.top;
        if (this.board.zIndexMax === 0 || this.el.style.zIndex < this.board.zIndexMax) {
            this.board.zIndexMax += 1;
            this.el.style.zIndex = this.board.zIndexMax;
        }
        document.addEventListener('touchmove', this.handleDrag, passiveSupported ? { passive: false } : false);
        document.addEventListener('touchend', this.handleDragEnd);

        document.addEventListener('mousemove', this.handleDrag);
        document.addEventListener('mouseleave', this.handleDragEnd);
        document.addEventListener('mouseup', this.handleDragEnd);
    };

    handleDrag = throttle((e) => {
        let x;
        let y;
        if (e.type === 'touchmove') {
            if (e.touches.length !== 1) return;
            x = e.touches[0].clientX;
            y = e.touches[0].clientY;
        } else {
            x = e.clientX;
            y = e.clientY;
        }
        e.preventDefault();
        e.stopPropagation();
        const newTop = Math.min(Math.max(0, (y - this.startY) + this.prevTop), this.board.el.clientHeight - (((this.maxRow - this.row) + 1) * this.board.tileSizeScaled()));
        const newLeft = Math.min(Math.max(0, (x - this.startX) + this.prevLeft), this.board.el.clientWidth - (((this.maxCol - this.col) + 1) * this.board.tileSizeScaled()));
        this.setPos(newTop, newLeft);
    }, 50);

    handleDragEnd = (e) => {
        if (e.type === 'touchend') {
            if (e.touches.length !== 0) return;
        }
        this.board.cancelDrag.call(this.board, this);

        document.removeEventListener('touchmove', this.handleDrag);
        document.removeEventListener('touchend', this.handleDragEnd);

        document.removeEventListener('mousemove', this.handleDrag);
        document.removeEventListener('mouseleave', this.handleDragEnd);
        document.removeEventListener('mouseup', this.handleDragEnd);
    };

    resize(topScale, leftScale) {
        this.setPos(this.top * topScale, this.left * leftScale);
    }

    setPos(top, left) {
        this.top = top;
        this.left = left;
        this.el.style.transform = `translate(${left}px, ${top}px)`;
    }

    remove() {
        if (this.deleted) return;
        this.board.el.removeChild(this.el);
        this.deleted = true;
    }
}
