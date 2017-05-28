import Tile from './tile';
import Container from './container';

const CONNECT_DISTANCE = 10;

export default class Board {
    constructor(el) {
        this.tiles = [];
        this.el = el;
        this.width = 200;
        this.height = 200;
        this.rows = 4;
        this.cols = 4;
        this.tileWidth = this.width / this.cols;
        this.tileHeight = this.height / this.rows;

        // Drag
        this.dragTarget = null;
        this.prevTop = 0;
        this.prevLeft = 0;
        this.startX = 0;
        this.startY = 0;
        this.zIndexMax = 0;
    }

    generateTiles() {
        const tiles = [];
        for (let row = 0; row < this.rows; row++) {
            const tilesRow = [];
            for (let col = 0; col < this.cols; col++) {
                const tile = new Tile(this, row, col);
                tilesRow.push(tile);
                this.tiles.push(tile);
            }
            tiles.push(tilesRow);
        }
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const tile = tiles[row][col];
                if (!tile.left) tile.neighbors.add(tiles[row][col - 1]);
                if (!tile.right) tile.neighbors.add(tiles[row][col + 1]);
                if (!tile.top) tile.neighbors.add(tiles[row - 1][col]);
                if (!tile.bot) tile.neighbors.add(tiles[row + 1][col]);
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
            this.dragTarget.setPos(newTop, newLeft);
        }
    };

    checkDone() {
        if (this.tiles.reduce((acc, tile) => acc && tile.neighbors.size === 0, true)) {
            console.log('DONE');
        }
    }

    mergeComponents(tile1, tile2) {
        const c1 = tile1.container;
        const c2 = tile2.container;
        const newRow = Math.min(c1.row, c2.row);
        const newCol = Math.min(c1.col, c2.col);
        const c = new Container(this, [...c1.tiles, ...c2.tiles], newRow, newCol, c2.top + ((newRow - c2.row) * this.tileHeight), c2.left + ((newCol - c2.col) * this.tileWidth));
        c1.tiles.forEach((tile) => {
            tile.setContainer(c, (c1.row - newRow) * this.tileHeight, (c1.col - newCol) * this.tileWidth);
            c2.tiles.forEach(other => tile.neighbors.delete(other));
        });
        c2.tiles.forEach((tile) => {
            tile.setContainer(c, (c2.row - newRow) * this.tileHeight, (c2.col - newCol) * this.tileWidth);
            c1.tiles.forEach(other => tile.neighbors.delete(other));
        });
        this.checkDone();
    }

    cancelDrag = () => {
        for (let i = 0; i < this.dragTarget.tiles.length; i++) {
            const tile = this.dragTarget.tiles[i];
            tile.neighbors.forEach((other) => {
                if (tile.getDistanceTo(other) <= CONNECT_DISTANCE) {
                    tile.neighbors.delete(other);
                    other.neighbors.delete(tile);
                    if (tile.container !== other.container) {
                        this.mergeComponents(tile, other);
                    }
                }
            });
        }
        this.dragTarget = null;
        this.el.removeEventListener('mousemove', this.handleMousemove);
        document.body.removeEventListener('mouseleave', this.cancelDrag);
    }
}
