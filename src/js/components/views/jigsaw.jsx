import React from 'react';
import PropTypes from 'prop-types';

import Board from '../../jigsaw/board';

const MAX_WIDTH = 300;
const MAX_HEIGHT = 300;

/**
 *
 *
 * @returns React Component
 */
class Jigsaw extends React.Component {

    constructor(props) {
        super(props);

        this.setImage(props.image, props.imageHeight, props.imageWidth);
    }

    componentDidMount() {
        this.board = new Board(this.boardEl);
    }

    componentWillReceiveProps(newProps) {
        if (!this.props.gameStarted && newProps.gameStarted) { // Game started
            this.board.generateTiles(this.imageHeight, this.imageWidth);
        }
        if (this.props.image !== newProps.image
            || this.props.imageHeight !== newProps.imageHeight
            || this.props.imageWidth !== newProps.imageWidth) {
            this.setImage(newProps.image, newProps.imageHeight, newProps.imageWidth);
            this.board.removeTiles();
        }
    }

    onChangeHandler = event => this.props.handleFileChange(event.target.files[0]);

    setImage(image, height, width) {
        if (height > 0 && width > 0) {
            this.imageValid = true;
            this.image = image;

            let scale = MAX_HEIGHT / height;
            if (MAX_WIDTH / width < scale) {
                scale = MAX_WIDTH / width;
            }

            this.imageHeight = height * scale;
            this.imageWidth = width * scale;
        } else {
            this.imageValid = false;
            this.image = 'no-image.svg';
            this.imageHeight = 0;
            this.imageWidth = 0;
        }
    }

    render() {
        return (
            <div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    style={{ height: 0, width: 0, overflow: 'hidden', position: 'absolute' }}
                >
                    <defs>
                        <clipPath id="tile">
                            <path
                                d="M 0 0
                                   L 20 0
                                   A 8 8 0 1 0 30 0
                                   L 50 0
                                   L 50 20
                                   A 8 8 0 1 1 50 30
                                   L 50 50
                                   L 30 50
                                   A 8 8 0 1 1 20 50
                                   L 0 50
                                   L 0 30
                                   A 8 8 0 1 0 0 20
                                   L 0 0"
                                stroke="red"
                                strokeWidth="1"
                                strokeDasharray="1, 2"
                                id="tile-path"
                                fill="transparent"
                            />
                        </clipPath>
                        <clipPath id="tile-top">
                            <path
                                d="M 0 0
                                   L 50 0
                                   L 50 20
                                   A 8 8 0 1 1 50 30
                                   L 50 50
                                   L 30 50
                                   A 8 8 0 1 1 20 50
                                   L 0 50
                                   L 0 30
                                   A 8 8 0 1 0 0 20
                                   L 0 0"
                                stroke="red"
                                strokeWidth="1"
                                strokeDasharray="1, 2"
                                id="tile-path-top"
                                fill="transparent"
                            />
                        </clipPath>
                        <clipPath id="tile-top-left">
                            <path
                                d="M 0 0
                                   L 50 0
                                   L 50 20
                                   A 8 8 0 1 1 50 30
                                   L 50 50
                                   L 30 50
                                   A 8 8 0 1 1 20 50
                                   L 0 50
                                   L 0 0"
                                stroke="red"
                                strokeWidth="1"
                                strokeDasharray="1, 2"
                                id="tile-path-top-left"
                                fill="transparent"
                            />
                        </clipPath>
                        <clipPath id="tile-top-right">
                            <path
                                d="M 0 0
                                   L 50 0
                                   L 50 50
                                   L 30 50
                                   A 8 8 0 1 1 20 50
                                   L 0 50
                                   L 0 30
                                   A 8 8 0 1 0 0 20
                                   L 0 0"
                                stroke="red"
                                strokeWidth="1"
                                strokeDasharray="1, 2"
                                id="tile-path-top-right"
                                fill="transparent"
                            />
                        </clipPath>
                        <clipPath id="tile-bot">
                            <path
                                d="M 0 0
                                   L 20 0
                                   A 8 8 0 1 0 30 0
                                   L 50 0
                                   L 50 20
                                   A 8 8 0 1 1 50 30
                                   L 50 50
                                   L 0 50
                                   L 0 30
                                   A 8 8 0 1 0 0 20
                                   L 0 0"
                                stroke="red"
                                strokeWidth="1"
                                strokeDasharray="1, 2"
                                id="tile-path-bot"
                                fill="transparent"
                            />
                        </clipPath>
                        <clipPath id="tile-bot-left">
                            <path
                                d="M 0 0
                                   L 20 0
                                   A 8 8 0 1 0 30 0
                                   L 50 0
                                   L 50 20
                                   A 8 8 0 1 1 50 30
                                   L 50 50
                                   L 0 50
                                   L 0 0"
                                stroke="red"
                                strokeWidth="1"
                                strokeDasharray="1, 2"
                                id="tile-path-bot-left"
                                fill="transparent"
                            />
                        </clipPath>
                        <clipPath id="tile-bot-right">
                            <path
                                d="M 0 0
                                   L 20 0
                                   A 8 8 0 1 0 30 0
                                   L 50 0
                                   L 50 50
                                   L 0 50
                                   L 0 30
                                   A 8 8 0 1 0 0 20
                                   L 0 0"
                                stroke="red"
                                strokeWidth="1"
                                strokeDasharray="1, 2"
                                id="tile-path-bot-right"
                                fill="transparent"
                            />
                        </clipPath>
                        <clipPath id="tile-left">
                            <path
                                d="M 0 0
                                   L 20 0
                                   A 8 8 0 1 0 30 0
                                   L 50 0
                                   L 50 20
                                   A 8 8 0 1 1 50 30
                                   L 50 50
                                   L 30 50
                                   A 8 8 0 1 1 20 50
                                   L 0 50
                                   L 0 0"
                                stroke="red"
                                strokeWidth="1"
                                strokeDasharray="1, 2"
                                id="tile-path-left"
                                fill="transparent"
                            />
                        </clipPath>
                        <clipPath id="tile-right">
                            <path
                                d="M 0 0
                                   L 20 0
                                   A 8 8 0 1 0 30 0
                                   L 50 0
                                   L 50 50
                                   L 30 50
                                   A 8 8 0 1 1 20 50
                                   L 0 50
                                   L 0 30
                                   A 8 8 0 1 0 0 20
                                   L 0 0"
                                stroke="red"
                                strokeWidth="1"
                                strokeDasharray="1, 2"
                                id="tile-path-right"
                                fill="transparent"
                            />
                        </clipPath>
                        <pattern id="img1" width="100%" height="100%" patternContentUnits="objectBoundingBox">
                            <image
                                preserveAspectRatio="none"
                                xlinkHref={this.image}
                                x="0"
                                y="0"
                                height="1"
                                width="1"
                            />
                        </pattern>
                    </defs>
                </svg>
                <div id="board" ref={(el) => { this.boardEl = el; }}>
                    <img src={this.image} alt="" style={{ display: this.props.gameStarted ? 'none' : 'block' }} />
                </div>
                <div>
                    <input type="file" accept="image/*" onChange={this.onChangeHandler} />
                    <button disabled={!this.imageValid} onClick={this.props.startGame}>Start game</button>
                </div>
            </div>
        );
    }
}

Jigsaw.propTypes = {
    gameStarted: PropTypes.bool.isRequired,
    startGame: PropTypes.func.isRequired,
    handleFileChange: PropTypes.func.isRequired,
    image: PropTypes.string.isRequired,
    imageHeight: PropTypes.number.isRequired,
    imageWidth: PropTypes.number.isRequired
};

export default Jigsaw;
