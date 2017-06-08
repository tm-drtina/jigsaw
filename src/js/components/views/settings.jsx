import React from 'react';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';

import config from '../../config';

/**
 *
 *
 * @returns React Component
 */
const Settings = props => (
    <form onSubmit={props.saveSettings}>
        <div className="form-group">
            <label className="control-label" htmlFor="set-maxrowcol">Maximum number of tiles per row or column</label>
            <InputRange
                name="set-maxrowcol"
                maxValue={config.maxTiles}
                minValue={config.minTiles}
                value={props.settings.maxRowsCols}
                onChange={value => props.setSetting('maxRowsCols', value)}
            />
        </div>
        <div className="form-group">
            <label className="control-label" htmlFor="set-audio-enabled">Sound enabled</label>
            <input
                className="set-audio-enabled"
                id="set-audio-enabled"
                type="checkbox"
                checked={props.settings.audioEnabled}
                onChange={e => props.setSetting('audioEnabled', e.target.checked)}
            />
        </div>

        <div className="form-group">
            <button type="submit" className="btn btn-primary" onClick={props.saveSettings}>Save</button>
        </div>
    </form>
);

Settings.propTypes = {
    settings: PropTypes.shape({
        audioEnabled: PropTypes.bool.isRequired,
        maxRowsCols: PropTypes.number.isRequired
    }).isRequired,
    setSetting: PropTypes.func.isRequired,
    saveSettings: PropTypes.func.isRequired
};

export default Settings;
