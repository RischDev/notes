import React from 'react';
import { Switch } from "react-router-dom";
import { Route as BrowserRoute } from "react-router-dom";
import NotesTool from './notes/NotesTool';

class App extends React.Component {
    render() {
        return (
        <Switch>
            <BrowserRoute path="/notes" component={NotesTool} />
        </Switch>
        );
    }
}

export default App;