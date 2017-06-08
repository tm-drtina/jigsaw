import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import JigsawContainer from '../containers/jigsaw-container';
import NavigationContainer from '../containers/navigation-container';
import SettingsContainer from '../containers/settings-container';

import Modal from '../views/modal';
import About from '../views/about';

// noinspection RequiredAttributes
const MainLayout = withRouter(({ history }) => (
    <div className="container main-layout">
        <NavigationContainer />
        <section className="layout-content">
            <JigsawContainer />
            <section className="modal-section">
                <Switch>
                    <Route path="/" exact />
                    <Route
                        path="/settings"
                        render={() => (
                            <Modal title="Settings" onClose={() => history.push('/')}>
                                <SettingsContainer />
                            </Modal>
                        )}
                    />
                    <Route
                        path="/about"
                        render={() => (
                            <Modal title="About" onClose={() => history.push('/')}>
                                <About />
                            </Modal>
                        )}
                    />
                    <Route
                        render={() => (
                            <Modal title="Page not found" onClose={() => history.push('/')}>
                                <p>Current page cannot be found.</p>
                            </Modal>
                        )}
                    />
                </Switch>
            </section>
        </section>
    </div>
));

export default MainLayout;
