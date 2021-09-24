import React, { lazy, Suspense, useState, useEffect } from 'react';
import Header from './component/Header';
import { BrowserRouter, Switch, Route, Router, Redirect } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/styles';
import Progress from './component/Progress';
const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})

import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const MarketingLazy = lazy(() => import('./component/MarketingApp'))
const AuthLazy = lazy(() => import('./component/AuthApp'))
const DashboardLazy = lazy(() => import('./component/DashboardApp'));

export default () => {

    const [isSignedIn, setIsSignedIn] = useState(false);
    
    useEffect(() => {
        if (isSignedIn) {
            history.push('/dashboard');
        }
    }, [isSignedIn])

    return (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                    <div> 
                        <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)}/>
                        <Suspense fallback={<Progress/>}>
                            <Switch>
                                <Route path='/auth' >
                                    <AuthLazy onSignedIn={() => setIsSignedIn(true)}> 
                                    </AuthLazy>
                                </Route>
                                <Route path='/dashboard'> 
                                {
                                    !isSignedIn && <Redirect to='/' />
                                } 
                                    <DashboardLazy />
                                </Route>
                                <Route path='/' component={MarketingLazy} />
                            </Switch>
                        </Suspense>
                    </div>
            </StylesProvider>
        </Router>
    );
}