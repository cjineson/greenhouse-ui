import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import AddressEntry from './AddressEntry';
import PropertyResults from './PropertyResults';

class App extends Component {
    render() {
        return ( 
        <Router>
            <
            Route exact path = "/"
            component = { AddressEntry }
            /> <
            Route path = "/propertyresults"
            component = { PropertyResults }
            /> 
        </Router >
        );
    }
}

export default App;