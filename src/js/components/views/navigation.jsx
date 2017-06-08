import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { gameStatus } from '../../config';

let fileSelect;

/**
 * Component handling navigation.
 *
 * @returns React Component
 */
const Navigation = props => (
    <nav className="navbar navbar-default">
        <div className="container-fluid">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" aria-expanded={props.menuOpen} onClick={props.toggleMenu}>
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                </button>
                <Link className="navbar-brand" to="/">
                    Jigsaw
                </Link>
            </div>

            <div
                className={`navbar-collapse collapse ${props.menuOpen ? 'in' : ''}`}
                aria-expanded={props.menuOpen}
                style={props.menuOpen ? {} : { height: 1 }}
            >
                <ul className="nav navbar-nav">
                    <li className={`${props.startGameDisabled ? 'disabled' : ''}`}>
                        <a
                            role="button"
                            tabIndex="0"
                            onClick={() => {
                                if (!props.startGameDisabled) props.changeStatus(gameStatus.START);
                                props.toggleMenu();
                            }}
                        >
                            Start game
                        </a>
                    </li>
                    <li>
                        <a
                            role="button"
                            tabIndex="0"
                            onClick={() => {
                                if (fileSelect) fileSelect.click();
                                props.toggleMenu();
                            }}
                        >
                            Load image
                            <input ref={(el) => { fileSelect = el; }} id="file-select" type="file" accept="image/*" onChange={props.onFileChange} />
                        </a>
                    </li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <Link to="/settings">
                            Settings
                        </Link>
                    </li>
                    <li>
                        <Link to="/about">
                            About
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);

Navigation.propTypes = {
    menuOpen: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func.isRequired,

    changeStatus: PropTypes.func.isRequired,
    startGameDisabled: PropTypes.bool.isRequired,
    onFileChange: PropTypes.func.isRequired
};

export default Navigation;
