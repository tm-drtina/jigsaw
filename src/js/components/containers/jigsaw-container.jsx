import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { changeFile, changeStatus } from '../../actions/jigsaw-actions';

import Jigsaw from '../views/jigsaw';

class JigsawContainer extends React.PureComponent {

    render() {
        return (
            <Jigsaw
                gameStatus={this.props.gameStatus}
                changeStatus={this.props.changeStatus}
                handleFileChange={this.handleFileChange}
                image={this.props.image}
                imageHeight={this.props.imageHeight}
                imageWidth={this.props.imageWidth}
            />
        );
    }
}

JigsawContainer.propTypes = {
    gameStatus: PropTypes.number.isRequired,
    changeStatus: PropTypes.func.isRequired,
    image: PropTypes.string.isRequired,
    imageHeight: PropTypes.number.isRequired,
    imageWidth: PropTypes.number.isRequired,
    changeFile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    image: state.jigsaw.dataURL,
    imageHeight: state.jigsaw.height,
    imageWidth: state.jigsaw.width,
    imageValid: state.jigsaw.valid,
    gameStatus: state.jigsaw.status
});

const mapDispatchToProps = dispatch => ({
    changeStatus: status => dispatch(changeStatus(status)),
    changeFile: (file, height, width) => dispatch(changeFile(file, height, width))
});

export default connect(mapStateToProps, mapDispatchToProps)(JigsawContainer);
export const undecorated = JigsawContainer;
