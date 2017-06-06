import Tile from './tile';
import Container from './container';

const CONNECT_DISTANCE = 10;
const MAX_WIDTH = 300;
const MAX_HEIGHT = 300;

export default class Board {

    tileHeight = 50;
    tileWidth = 50;
    tileHeightTotal = 66;
    tileWidthTotal = 66;

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
        let scale = MAX_HEIGHT / imageHeight;
        if (MAX_WIDTH / imageWidth < scale) {
            scale = MAX_WIDTH / imageWidth;
        }

        this.height = imageHeight * scale;
        this.width = imageWidth * scale;

        let patternHeight = 0;
        this.rows = 0;
        while (patternHeight < this.height) {
            patternHeight += this.tileHeight;
            this.rows += 1;
        }
        this.topOffset = (patternHeight - this.height) / 2;

        let patternWidth = 0;
        this.cols = 0;
        while (patternWidth < this.width) {
            patternWidth += this.tileWidth;
            this.cols += 1;
        }
        this.leftOffset = (patternWidth - this.width) / 2;

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
        const c = new Container(this, [...c1.tiles, ...c2.tiles], newRow, newCol, c2.top + ((newRow - c2.row) * this.tileHeight), c2.left + ((newCol - c2.col) * this.tileWidth));
        c1.tiles.forEach((tile) => {
            tile.setContainer(c, (c1.row - newRow) * this.tileHeight, (c1.col - newCol) * this.tileWidth);
            c2.tiles.forEach(other => tile.neighbors.delete(other));
        });
        c2.tiles.forEach((tile) => {
            tile.setContainer(c, (c2.row - newRow) * this.tileHeight, (c2.col - newCol) * this.tileWidth);
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
