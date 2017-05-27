import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { createHashHistory } from 'history';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import reducers from './reducers';
import MainLayout from './components/layouts/main-layout';

require('../scss/app.scss');

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
/* eslint-enable no-underscore-dangle */

const history = createHashHistory();
const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(routerMiddleware(history))
    )
);

if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
        // eslint-disable-next-line global-require
        const nextRootReducer = require('./reducers');
        store.replaceReducer(nextRootReducer);
    });
}

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Component />
                </ConnectedRouter>
            </Provider>
        </AppContainer>,
        document.getElementById('app')
    );
};

render(MainLayout);
if (module.hot) {
    module.hot.accept('./components/layouts/main-layout', () => {
        // eslint-disable-next-line global-require
        const nextMain = require('./components/layouts/main-layout').default;
        render(nextMain);
    });
}
