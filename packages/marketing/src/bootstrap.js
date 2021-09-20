import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMemoryHistory, createBrowserHistory } from 'history';
// Mount function to start up the apps
const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
    const memoryHistory = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    });

    if (onNavigate) {
        memoryHistory.listen( onNavigate );
    }

    ReactDOM.render(
      <App history={memoryHistory}></App>,
      el,
    );

    return {
        onParentNavigate({pathname: nextPathname}) {
            console.log('parent pathname', nextPathname)
            const {pathname} = memoryHistory.location;
            console.log('Parent is navigating', nextPathname);
            if (pathname !== nextPathname) {
                memoryHistory.push(nextPathname);
                console.log('Marketing location after', memoryHistory.location)
            }
        }
    }
}

// If we are in development and in isolation
// call mount immediately
if ( process.env.NODE_ENV === 'development' ) {
    const devRoot = document.querySelector('#_marketing-dev-root');
    if (devRoot) {
        mount(devRoot, { defaultHistory: createBrowserHistory() });
    }
}

// We are running through container
// and we should export the mount function
export { mount };