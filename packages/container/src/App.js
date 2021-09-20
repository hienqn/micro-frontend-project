import React, { lazy, Suspense, useState } from 'react';
import Header from './component/Header';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/styles';
import Progress from './component/Progress';
const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})

const MarketingLazy = lazy(() => import('./component/MarketingApp'))
const AuthLazy = lazy(() => import('./component/AuthApp'))


export default () => {

    const [isSignedIn, setIsSignedIn] = useState(false);

    return (
    <StylesProvider generateClassName={generateClassName}>
        <BrowserRouter>
            <div> 
                <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)}/>
                <Suspense fallback={<Progress/>}>
                    <Switch>
                        <Route path='/auth' >
                            <AuthLazy onSignedIn={() => setIsSignedIn(true)}> 
                            </AuthLazy>
                        </Route>
                        <Route path='/' component={MarketingLazy} />
                    </Switch>
                </Suspense>
            </div>
        </BrowserRouter>
    </StylesProvider>
    );
}