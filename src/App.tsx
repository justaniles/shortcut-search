import React, { Component } from "react";

import "./App.scss";

import ConnectedSearchBox from "./SearchBox/ConnectedSearchBox";
import ConnectedShortcutsList from "./ShortcutsList/ConnectedShortcutsList";
import ConnectedEditShortcut from "./EditShortcut/ConnectedEditShortcut";

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-Main">
                    <div className="App-Main__SearchBox">
                        <ConnectedSearchBox />
                    </div>
                    <div className="App-Main__Shortcuts">
                        <ConnectedShortcutsList />
                    </div>
                </div>
                <ConnectedEditShortcut />
            </div>
        );
    }
}

export default App;
