import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { changeFile, startGame } from '../../actions/jigsaw-actions';

import Jigsaw from '../views/jigsaw';

class JigsawContainer extends React.PureComponent {

    static checkFileExtension(filename) {
        return /\.(jpe?g|png|gif)$/i.test(filename);
    }

    handleFileLoaded = (event) => {
        const imgSrc = event.target.result;
        const img = new Image();
        img.src = imgSrc;
        img.addEventListener('load', () => this.props.changeFile(imgSrc, img.height, img.width));
    };

    handleFileChange = (file) => {
        if (!file) return;
        if (!JigsawContainer.checkFileExtension(file.name)) {
            // show error
        } else {
            const reader = new FileReader();
            reader.addEventListener('load', this.handleFileLoaded);
            reader.readAsDataURL(file);
        }
    };

    render() {
        return (
            <Jigsaw
                gameStarted={this.props.gameStarted}
                startGame={this.props.startGame}
                handleFileChange={this.handleFileChange}
                image={this.props.image}
                imageHeight={this.props.imageHeight}
                imageWidth={this.props.imageWidth}
            />
        );
    }

}

JigsawContainer.propTypes = {
    gameStarted: PropTypes.bool.isRequired,
    startGame: PropTypes.func.isRequired,
    image: PropTypes.string.isRequired,
    imageHeight: PropTypes.number.isRequired,
    imageWidth: PropTypes.number.isRequired,
    changeFile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    image: state.jigsaw.dataURL,
    imageHeight: state.jigsaw.height,
    imageWidth: state.jigsaw.width,
    gameStarted: state.jigsaw.gameStarted
});

const mapDispatchToProps = dispatch => ({
    startGame: () => dispatch(startGame()),
    changeFile: (file, height, width) => dispatch(changeFile(file, height, width))
});

export default connect(mapStateToProps, mapDispatchToProps)(JigsawContainer);
export const undecorated = JigsawContainer;
