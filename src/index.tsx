import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.scss";
import App from "./App";
import { configureStore } from "./redux/store";
import { startFetchShortcuts, endFetchShortcuts } from "./redux/actions";
import { Shortcut } from "./interfaces";

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);

// Fetch initial shortcuts
const testShortcuts: Shortcut[] = [
    {
        id: 0,
        title: "Microsoft",
        url: "https://microsoft.com",
        tags: ["work", "microsoft"],
    },
    {
        id: 1,
        title: "IAM Portal Repo",
        url:
            "https://msazure.visualstudio.com/DefaultCollection/One/_git/AD-IAM-Services-Portal-UX",
        tags: ["iam", "azdev"],
    },
    {
        id: 2,
        title: "HRweb Global Country Holidays",
        url:
            "https://microsoft.sharepoint.com/sites/HRw/Pages/globalholidays.aspx",
        tags: ["hrweb"],
    },
    {
        id: 3,
        title: "Azure Portal Docs",
        url: "https://github.com/Azure/portaldocs",
        tags: ["ibiza", "azureportal"],
    },
    {
        id: 4,
        title: "AD-Powershell Repo",
        url: "https://msazure.visualstudio.com/One/_git/AD-powershell",
        tags: ["azdev", "repo"],
    },
];
store.dispatch(startFetchShortcuts());
const Storage = chrome.storage.sync;
Storage.get("shortcutsV1", shortcuts => {
    // store.dispatch(endFetchShortcuts(shortcuts.values, shortcuts.index));
    store.dispatch(endFetchShortcuts(testShortcuts, testShortcuts.length + 1));
});
