import React from 'react';
import { connect } from 'react-redux';

import Jigsaw from '../views/jigsaw';

const JigsawContainer = props => (
    <Jigsaw {...props} />
);

// eslint-disable-next-line no-unused-vars
const mapStateToProps = state => ({
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(JigsawContainer);
export const undecorated = JigsawContainer;
