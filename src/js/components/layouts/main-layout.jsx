import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import NoMatchContainer from '../containers/no-match-container';
import JigsawContainer from '../containers/jigsaw-container';
import NavigationContainer from '../containers/navigation-container';

// noinspection RequiredAttributes
const MainLayout = () => (
    <div className="container main-layout">
        <NavigationContainer />
        <section className="layout-content">
            <Switch>
                <Redirect from="/" exact to="/jigsaw" />
                <Route path="/jigsaw" component={JigsawContainer} />
                <Route component={NoMatchContainer} />
            </Switch>
        </section>
    </div>
);

export default MainLayout;
