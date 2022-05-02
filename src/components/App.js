/** @format */

import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { Route as BrowserRoute } from 'react-router-dom';
import NotesTool from './notes/NotesTool';

class App extends React.Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <BrowserRoute path="/notes" component={NotesTool} />
                </Switch>
            </HashRouter>
        );
    }
}

export default App;
