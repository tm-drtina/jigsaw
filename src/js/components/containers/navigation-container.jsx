import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { checkFileExtension } from '../../utils';

import { changeFile, changeStatus } from '../../actions/jigsaw-actions';
import { toggleMenu } from '../../actions/navigation-actions';

import Navigation from '../views/navigation';
import { gameStatus } from '../../config';

/**
 * Component handling navigation.
 *
 * @returns React Component
 */
class NavigationContainer extends React.PureComponent {

    handleFileLoaded = (event) => {
        const imgSrc = event.target.result;
        const img = new Image();
        img.src = imgSrc;
        img.addEventListener('load', () => {
            if (img.height > 0 && img.width > 0) {
                this.props.changeFile(imgSrc, img.height, img.width);
            } else {
                this.props.changeStatus(gameStatus.ERROR);
            }
        });
        img.addEventListener('error', () => this.props.changeStatus(gameStatus.ERROR));
    };

    handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        if (!checkFileExtension(file.name)) {
            this.props.changeStatus(gameStatus.ERROR);
        } else {
            const reader = new FileReader();
            reader.addEventListener('load', this.handleFileLoaded);
            reader.addEventListener('error', () => this.props.changeStatus(gameStatus.ERROR));
            reader.readAsDataURL(file);
        }
    };

    render() {
        return (
            <Navigation
                menuOpen={this.props.menuOpen}
                toggleMenu={this.props.toggleMenu}
                changeStatus={this.props.changeStatus}
                startGameDisabled={this.props.gameStatus === gameStatus.INIT || this.props.gameStatus === gameStatus.ERROR}
                onFileChange={this.handleFileChange}
            />
        );
    }
}

NavigationContainer.propTypes = {
    menuOpen: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func.isRequired,

    gameStatus: PropTypes.number.isRequired,

    changeStatus: PropTypes.func.isRequired,
    changeFile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    menuOpen: state.navigation.menuOpen,
    gameStatus: state.jigsaw.status
});

const mapDispatchToProps = dispatch => ({
    changeStatus: status => dispatch(changeStatus(status)),
    changeFile: (file, height, width) => dispatch(changeFile(file, height, width)),
    toggleMenu: () => dispatch(toggleMenu())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationContainer);
export const undecorated = NavigationContainer;
