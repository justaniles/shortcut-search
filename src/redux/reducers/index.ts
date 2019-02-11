import { Reducer } from "redux";

import { AppState } from "../../interfaces";
import { AllActions, UndoActionTypes } from "../actions";
import { shortcutsReducer } from "./shortcuts";

export const rootReducer: Reducer<AppState, AllActions> = (state, action) => {
    if (!state) {
        return {
            shortcuts: shortcutsReducer(undefined, action),
            undo: {
                index: 0,
                isVisible: false,
            },
        };
    }

    let undoState = state.undo;

    // The undo reducer must operate within the root reducer, since it modifies the whole state tree
    switch (action.type) {
        case UndoActionTypes.ShowUndo:
            undoState = {
                text: action.text,
                state: action.previousState,
                index: undoState.index + 1,
                isVisible: true,
            };
            break;
        case UndoActionTypes.HideUndo:
            undoState = {
                ...undoState,
                text: undefined,
                state: undefined,
                isVisible: false,
            };
            break;
        case UndoActionTypes.ExecuteUndo:
            const stateToRestore = undoState.state;
            if (!stateToRestore) {
                throw new Error(
                    `[Reducer:ExecuteUndo] Cannot execute undo, since no state exists to restore.`
                );
            }

            // Note: we return here to overwrite the whole state tree!
            return {
                ...stateToRestore,
                undo: {
                    ...undoState,
                    text: undefined,
                    state: undefined,
                    isVisible: false,
                },
            };
    }

    return {
        shortcuts: shortcutsReducer(state.shortcuts, action),
        undo: undoState,
    };
};
