import { Store, createStore } from "redux";
import { rootReducer } from "./reducers";

export const configureStore = (): Store =>
    createStore(
        rootReducer,
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
            (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    );
