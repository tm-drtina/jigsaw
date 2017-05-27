import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import NoMatchContainer from '../containers/no-match-container';
import JigsawContainer from '../containers/jigsaw-container';

const MainLayout = () => (
    <div className="container">
        <Switch>
            <Redirect from="/" exact to="/jigsaw" />
            <Route path="/jigsaw" component={JigsawContainer} />
            <Route component={NoMatchContainer} />
        </Switch>
    </div>
);

export default MainLayout;
