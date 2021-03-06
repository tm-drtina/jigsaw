import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { changeSettings } from '../../actions/jigsaw-actions';

import Settings from '../views/settings';

class SettingsContainer extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            settings: Object.assign({}, props.settings)
        };
    }

    setSetting = (key, value) => {
        this.setState({
            settings: Object.assign({}, this.state.settings, {
                [key]: value
            })
        });
    };

    saveSettings = (event) => {
        event.preventDefault();
        this.props.changeSettings(this.state.settings);
        this.props.history.push('/');
    };

    render() {
        return (
            <Settings
                settings={this.state.settings}
                setSetting={this.setSetting}
                saveSettings={this.saveSettings}
            />
        );
    }
}

SettingsContainer.propTypes = {
    settings: PropTypes.shape({}).isRequired,
    changeSettings: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
};

const mapStateToProps = state => ({
    settings: state.jigsaw.settings
});

const mapDispatchToProps = dispatch => ({
    changeSettings: settings => dispatch(changeSettings(settings))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SettingsContainer));
export const undecorated = SettingsContainer;
