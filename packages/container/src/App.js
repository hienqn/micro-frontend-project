import React from 'react';
import MarketingApp from './component/MarketingApp';
import Header from './component/Header';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/styles';
import AuthApp from './component/AuthApp';

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})

export default () => {
    return (
    <StylesProvider generateClassName={generateClassName}>
        <BrowserRouter>
            <div> 
                <Header />
                <Switch>
                    <Route path='/auth' component={AuthApp} />
                    <Route path='/' component={MarketingApp} />
                </Switch>
            </div>
        </BrowserRouter>
    </StylesProvider>
    );
}