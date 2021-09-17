import React from 'react';
import MarketingApp from './component/MarketingApp';
import Header from './component/Header';
import { BrowserRouter } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/styles';

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})

export default () => {
    return (
    <StylesProvider generateClassName={generateClassName}>
        <BrowserRouter>
            <div> 
                <Header />
                <MarketingApp />
            </div>
        </BrowserRouter>
    </StylesProvider>);
}