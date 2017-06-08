import React from 'react';
import PropTypes from 'prop-types';

import config, { gameStatus } from '../../config';
import Board from '../../jigsaw/board';
import Modal from './modal';

/**
 *
 *
 * @returns React Component
 */
class Jigsaw extends React.Component {

    componentDidMount() {
        this.board = new Board(this.boardEl, () => this.props.changeStatus(gameStatus.RUNNING), () => this.props.changeStatus(gameStatus.DONE));
        if (this.props.gameStatus === gameStatus.RUNNING) {
            this.props.changeStatus(gameStatus.LOADED);
            // TODO: load saved state
        }
    }

    componentWillReceiveProps(newProps) {
        if (this.props.gameStatus !== newProps.gameStatus) {
            if (newProps.gameStatus === gameStatus.ERROR
                || newProps.gameStatus === gameStatus.LOADING
                || newProps.gameStatus === gameStatus.LOADED
            ) {
                this.board.removeTiles();
            } else if (newProps.gameStatus === gameStatus.START) {
                this.board.generateTiles(newProps.imageHeight, newProps.imageWidth, newProps.tilesPerRowCol);
            }
        }
    }

    render() {
        return (
            <div className="panel panel-default jigsaw">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    style={{ height: 0, width: 0, overflow: 'hidden', position: 'absolute' }}
                >
                    <defs>
                        <clipPath id="tile">
                            <path
                                d="M 0 0
                                   l 20 0
                                   a 8 8 0 1 0 10 0
                                   l 20 0
                                   l 0 20
                                   a 8 8 0 1 1 0 10
                                   l 0 20
                                   l -20 0
                                   a 8 8 0 1 1 -10 0
                                   l -20 0
                                   l 0 -20
                                   a 8 8 0 1 0 0 -10
                                   l 0 -20"
                                stroke="red"
                                strokeWidth="1"
                                strokeDasharray="1, 2"
                                id="tile-path"
                                fill="transparent"
                                style={{ vectorEffect: 'non-scaling-stroke' }}
                            />
                        </clipPath>
                        <clipPath id="tile-top">
                            <path
                                d="M 0 0
                                   l 50 0
                                   l 0 20
                                   a 8 8 0 1 1 0 10
                                   l 0 20
                                   l -20 0
                                   a 8 8 0 1 1 -10 0
                                   l -20 0
                                   l 0 -20
                                   a 8 8 0 1 0 0 -10
                                   l 0 -20"
                                stroke="red"
                                strokeWidth="1"
                                strokeDasharray="1, 2"
                                id="tile-path-top"
                                fill="transparent"
                                style={{ vectorEffect: 'non-scaling-stroke' }}
                            />
                        </clipPath>
                        <clipPath id="tile-top-left">
                            <path
                                d="M 0 0
                                   l 50 0
                                   l 0 20
                                   a 8 8 0 1 1 0 10
                                   l 0 20
                                   l -20 0
                                   a 8 8 0 1 1 -10 0
                                   l -20 0
                                   l 0 -50"
                                stroke="red"
                                strokeWidth="1"
                                strokeDasharray="1, 2"
                                id="tile-path-top-left"
                                fill="transparent"
                                style={{ vectorEffect: 'non-scaling-stroke' }}
                            />
                        </clipPath>
                        <clipPath id="tile-top-right">
                            <path
                                d="M 0 0
                                   l 50 0
                                   l 0 50
                                   l -20 0
                                   a 8 8 0 1 1 -10 0
                                   l -20 0
                                   l 0 -20
                                   a 8 8 0 1 0 0 -10
                                   l 0 -20"
                                stroke="red"
                                strokeWidth="1"
                                strokeDasharray="1, 2"
                                id="tile-path-top-right"
                                fill="transparent"
                                style={{ vectorEffect: 'non-scaling-stroke' }}
                            />
                        </clipPath>
                        <clipPath id="tile-bot">
                            <path
                                d="M 0 0
                                   l 20 0
                                   a 8 8 0 1 0 10 0
                                   l 20 0
                                   l 0 20
                                   a 8 8 0 1 1 0 10
                                   l 0 20
                                   l -50 0
                                   l 0 -20
                                   a 8 8 0 1 0 0 -10
                                   l 0 -20"
                                stroke="red"
                                strokeWidth="1"
                                strokeDasharray="1, 2"
                                id="tile-path-bot"
                                fill="transparent"
                                style={{ vectorEffect: 'non-scaling-stroke' }}
                            />
                        </clipPath>
                        <clipPath id="tile-bot-left">
                            <path
                                d="M 0 0
                                   l 20 0
                                   a 8 8 0 1 0 10 0
                                   l 20 0
                                   l 0 20
                                   a 8 8 0 1 1 0 10
                                   l 0 20
                                   l -50 0
                                   l 0 -50"
                                stroke="red"
                                strokeWidth="1"
                                strokeDasharray="1, 2"
                                id="tile-path-bot-left"
                                fill="transparent"
                                style={{ vectorEffect: 'non-scaling-stroke' }}
                            />
                        </clipPath>
                        <clipPath id="tile-bot-right">
                            <path
                                d="M 0 0
                                   l 20 0
                                   a 8 8 0 1 0 10 0
                                   l 20 0
                                   l 0 50
                                   l -50 0
                                   l 0 -20
                                   a 8 8 0 1 0 0 -10
                                   l 0 -20"
                                stroke="red"
                                strokeWidth="1"
                                strokeDasharray="1, 2"
                                id="tile-path-bot-right"
                                fill="transparent"
                                style={{ vectorEffect: 'non-scaling-stroke' }}
                            />
                        </clipPath>
                        <clipPath id="tile-left">
                            <path
                                d="M 0 0
                                   l 20 0
                                   a 8 8 0 1 0 10 0
                                   l 20 0
                                   l 0 20
                                   a 8 8 0 1 1 0 10
                                   l 0 20
                                   l -20 0
                                   a 8 8 0 1 1 -10 0
                                   l -20 0
                                   l 0 -50"
                                stroke="red"
                                strokeWidth="1"
                                strokeDasharray="1, 2"
                                id="tile-path-left"
                                fill="transparent"
                                style={{ vectorEffect: 'non-scaling-stroke' }}
                            />
                        </clipPath>
                        <clipPath id="tile-right">
                            <path
                                d="M 0 0
                                   l 20 0
                                   a 8 8 0 1 0 10 0
                                   l 20 0
                                   l 0 50
                                   l -20 0
                                   a 8 8 0 1 1 -10 0
                                   l -20 0
                                   l 0 -20
                                   a 8 8 0 1 0 0 -10
                                   l 0 -20"
                                stroke="red"
                                strokeWidth="1"
                                strokeDasharray="1, 2"
                                id="tile-path-right"
                                fill="transparent"
                                style={{ vectorEffect: 'non-scaling-stroke' }}
                            />
                        </clipPath>
                        <pattern id="img1" width="100%" height="100%" patternContentUnits="objectBoundingBox">
                            <image
                                preserveAspectRatio="none"
                                xlinkHref={this.props.image}
                                x="0"
                                y="0"
                                height="1"
                                width="1"
                            />
                        </pattern>
                    </defs>
                </svg>
                <div className="panel-body" id="board" ref={(el) => { this.boardEl = el; }}>
                    {this.props.gameStatus === gameStatus.INIT &&
                        <h4>Load image from the top menu</h4>
                    }
                    {(this.props.gameStatus === gameStatus.LOADING || this.props.gameStatus === gameStatus.START) &&
                        <div className="loading">
                            <i className="fa fa-spinner fa-spin fa-3x fa-fw" />
                            <span className="sr-only">Loading...</span>
                        </div>
                    }
                    {this.props.gameStatus === gameStatus.ERROR &&
                        <h4>Selected image cannot be loaded</h4>
                    }
                    {this.props.gameStatus === gameStatus.LOADED &&
                        <img draggable={false} src={this.props.image} alt="" />
                    }
                    {(this.props.gameStatus === gameStatus.ERROR || this.props.gameStatus === gameStatus.INIT) &&
                        <img draggable={false} src={config.noImage} alt="" />
                    }
                    {this.props.gameStatus === gameStatus.DONE &&
                        <Modal title="Congratulations" text="You've successfully completed this puzzle." onClose={() => this.props.changeStatus(gameStatus.LOADED)} />
                    }
                </div>
            </div>
        );
    }
}

Jigsaw.propTypes = {
    gameStatus: PropTypes.number.isRequired,
    changeStatus: PropTypes.func.isRequired,

    tilesPerRowCol: PropTypes.number.isRequired,

    image: PropTypes.string.isRequired,
    imageHeight: PropTypes.number.isRequired,
    imageWidth: PropTypes.number.isRequired
};

export default Jigsaw;
