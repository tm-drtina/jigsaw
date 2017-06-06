import Tile from './tile';
import Container from './container';

const CONNECT_DISTANCE = 10;

export default class Board {

    tileSize = 50;
    tileSizeTotal = 66;

    scale = 1;

    tileSizeScaled = () => Math.floor(this.tileSize * this.scale);
    tileSizeTotalScaled = () => Math.floor(this.tileSizeTotal * this.scale);

    maxRowsCols = 10;

    width = 0;
    height = 0;
    rows = 0;
    cols = 0;
    topOffset = 0;
    leftOffset = 0;

    // Drag
    zIndexMax = 0;

    constructor(el, gameStartedCallback, doneCallback) {
        this.tiles = [];
        this.el = el;
        this.gameStartedCallback = gameStartedCallback;
        this.doneCallback = doneCallback;
    }

    generateTiles(imageHeight, imageWidth) {
        if (this.tiles.length > 0) {
            this.removeTiles();
        }

        const maxHeight = this.el.clientHeight * 0.6;
        const maxWidth = this.el.clientWidth * 0.6;

        let scale = maxHeight / imageHeight;
        if (maxWidth / imageWidth < scale) {
            scale = maxWidth / imageWidth;
        }

        this.height = imageHeight * scale;
        this.width = imageWidth * scale;

        if (this.height > this.width) {
            this.rows = this.maxRowsCols;
            this.scale = this.height / (this.maxRowsCols * this.tileSize);

            this.cols = 0;
            let patternWidth = 0;
            while (patternWidth < this.width) {
                patternWidth += this.tileSizeScaled();
                this.cols += 1;
            }

            this.leftOffset = Math.floor(((this.cols * this.tileSize) - (this.width / this.scale)) / 2);
            this.topOffset = Math.floor(((this.rows * this.tileSize) - (this.height / this.scale)) / 2);
        } else {
            this.cols = this.maxRowsCols;
            this.scale = this.width / (this.maxRowsCols * this.tileSize);

            this.rows = 0;
            let patternHeight = 0;
            while (patternHeight < this.height) {
                patternHeight += this.tileSizeScaled();
                this.rows += 1;
            }

            this.leftOffset = Math.floor(((this.cols * this.tileSize) - (this.width / this.scale)) / 2);
            this.topOffset = Math.floor(((this.rows * this.tileSize) - (this.height / this.scale)) / 2);
        }

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
        this.gameStartedCallback();
    }

    removeTiles() {
        this.tiles.forEach((tile) => {
            tile.container.remove();
        });
        this.tiles = [];
    }

    checkDone() {
        if (this.tiles.reduce((acc, tile) => acc && tile.neighbors.size === 0, true)) {
            this.doneCallback();
        }
    }

    mergeComponents(tile1, tile2) {
        const c1 = tile1.container;
        const c2 = tile2.container;
        const newRow = Math.min(c1.row, c2.row);
        const newCol = Math.min(c1.col, c2.col);
        const newMaxRow = Math.min(c1.maxRow, c2.maxRow);
        const newMaxCol = Math.min(c1.maxCol, c2.maxCol);
        const c = new Container(this, [...c1.tiles, ...c2.tiles], newRow, newCol, newMaxRow, newMaxCol, c2.top + ((newRow - c2.row) * this.tileSizeScaled()), c2.left + ((newCol - c2.col) * this.tileSizeScaled()));
        c1.tiles.forEach((tile) => {
            tile.setContainer(c, (c1.row - newRow) * this.tileSizeScaled(), (c1.col - newCol) * this.tileSizeScaled());
            c2.tiles.forEach(other => tile.neighbors.delete(other));
        });
        c2.tiles.forEach((tile) => {
            tile.setContainer(c, (c2.row - newRow) * this.tileSizeScaled(), (c2.col - newCol) * this.tileSizeScaled());
            c1.tiles.forEach(other => tile.neighbors.delete(other));
        });
        c1.remove();
        c2.remove();
        this.checkDone();
    }

    cancelDrag = (container) => {
        for (let i = 0; i < container.tiles.length; i++) {
            const tile = container.tiles[i];
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
    }
}
