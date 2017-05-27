import React from 'react';

import Board from '../../jigsaw/board';

/**
 * Component that will be shown, when Router can't match any other route.
 *
 * @returns React Component
 */
class Jigsaw extends React.Component {

    componentDidMount() {
        const board = new Board(this.boardEl);
        board.generateTiles();
    }

    boardEl = null;

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
                                strokeWidth="3"
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
                                strokeWidth="3"
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
                                strokeWidth="3"
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
                                strokeWidth="3"
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
                                strokeWidth="3"
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
                                strokeWidth="3"
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
                                strokeWidth="3"
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
                                   L 0 0"
                                stroke="red"
                                strokeWidth="3"
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
                                strokeWidth="3"
                                strokeDasharray="1, 2"
                                id="tile-path-right"
                                fill="transparent"
                            />
                        </clipPath>
                        <pattern id="img1" width="100%" height="100%" patternContentUnits="objectBoundingBox">
                            <image
                                preserveAspectRatio="none"
                                xlinkHref="http://www.oxdog.net/2015/wp-content/uploads/2015/03/5112101_ROTOR_RD3.jpg"
                                x="0"
                                y="0"
                                height="1"
                                width="1"
                            />
                        </pattern>
                    </defs>
                </svg>
                <div id="board" ref={(el) => { this.boardEl = el; }} />
            </div>
        );
    }
}

Jigsaw.propTypes = {
};

export default Jigsaw;
