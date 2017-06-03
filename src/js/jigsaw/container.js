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
    constructor(board, tiles, row, col, initTop, initLeft) {
        this.board = board;
        this.tiles = tiles;
        this.row = row;
        this.col = col;
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
        this.prevTop = parseInt(this.el.style.top, 10);
        this.prevLeft = parseInt(this.el.style.left, 10);
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

    handleDrag = (e) => {
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
        const newTop = Math.min(Math.max(0, (y - this.startY) + this.prevTop), this.board.el.clientHeight - 10);
        const newLeft = Math.min(Math.max(0, (x - this.startX) + this.prevLeft), this.board.el.clientWidth - 10);
        this.setPos(newTop, newLeft);
    };

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

    setPos(top, left) {
        this.top = top;
        this.left = left;
        this.el.style.top = `${top}px`;
        this.el.style.left = `${left}px`;
    }

    remove() {
        if (this.deleted) return;
        this.board.el.removeChild(this.el);
        this.deleted = true;
    }
}
