import React, { Component } from "react";

import "./App.css";

import ConnectedSearchBox from "./SearchBox/ConnectedSearchBox";
import ConnectedShortcutsList from "./ShortcutsList/ConnectedShortcutsList";

class App extends Component {
    render() {
        return (
            <div className="App">
                <ConnectedSearchBox />
                <ConnectedShortcutsList />
            </div>
        );
    }
}

export default App;
