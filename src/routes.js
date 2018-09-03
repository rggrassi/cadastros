import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Produto from './Pages/Produto';
import Produtos from './Pages/Produtos';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={() => <h1>Login</h1>} />
            <Route path="/produto" component={Produto} />
            <Route path="/produtos" component={Produtos} />
        </Switch>    
    </BrowserRouter>
)

export default Routes