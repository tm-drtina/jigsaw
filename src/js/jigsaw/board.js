import Tile from './tile';

export default class Board {
    constructor(el) {
        this.tiles = [];
        this.containers = [];
        this.el = el;
        this.width = 200;
        this.height = 200;
        this.tilesPerRow = 4;
        this.tilesPerCol = 4;
        this.dragTarget = null;
        this.prevTop = 0;
        this.prevLeft = 0;
        this.startX = 0;
        this.startY = 0;
        this.zIndexMax = 0;
    }

    generateTiles() {
        const tileWidth = this.width / this.tilesPerRow;
        const tileHeight = this.height / this.tilesPerCol;
        for (let row = 0; row < this.tilesPerRow; row++) {
            for (let col = 0; col < this.tilesPerCol; col++) {
                const tile = new Tile(
                    this,
                    col * tileHeight,
                    row * tileWidth,
                    this.width,
                    this.height,
                    col * 20,
                    row * 20,
                    row === 0,
                    row === this.tilesPerRow - 1,
                    col === 0,
                    col === this.tilesPerCol - 1);
                this.tiles.push(tile);
                this.containers.push(tile.container);
            }
        }
    }

    startDrag = (e, container) => {
        e.preventDefault();
        this.dragTarget = container;
        this.startX = e.clientX;
        this.startY = e.clientY;
        this.prevTop = parseInt(this.dragTarget.el.style.top, 10);
        this.prevLeft = parseInt(this.dragTarget.el.style.left, 10);
        if (this.zIndexMax === 0 || this.dragTarget.el.style.zIndex < this.zIndexMax) {
            this.zIndexMax += 1;
            this.dragTarget.el.style.zIndex = this.zIndexMax;
        }
        this.el.addEventListener('mousemove', this.handleMousemove);
        document.body.addEventListener('mouseleave', this.cancelDrag);
    };

    handleMousemove = (e) => {
        if (this.dragTarget !== null) {
            const newTop = Math.min(Math.max(0, (e.clientY - this.startY) + this.prevTop), this.el.clientHeight - 10);
            const newLeft = Math.min(Math.max(0, (e.clientX - this.startX) + this.prevLeft), this.el.clientWidth - 10);
            this.dragTarget.el.style.top = `${newTop}px`;
            this.dragTarget.el.style.left = `${newLeft}px`;
        }
    };

    cancelDrag = () => {
        this.dragTarget = null;
        this.el.removeEventListener('mousemove', this.handleMousemove);
        document.body.removeEventListener('mouseleave', this.cancelDrag);
    }
}
