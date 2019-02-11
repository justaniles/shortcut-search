import { Action } from "redux";
import { AppState } from "../../interfaces";
import { ThunkResult } from "./interfaces";

export enum UndoActionTypes {
    ShowUndo = "showUndo",
    HideUndo = "hideUndo",
    ExecuteUndo = "executeUndo",
}

export interface ShowUndoAction extends Action<UndoActionTypes.ShowUndo> {
    previousState: AppState;
    text: string;
}

const showUndo = (text: string, previousState: AppState): ThunkResult => (
    dispatch,
    getState
) => {
    dispatch({
        text,
        previousState,
        type: UndoActionTypes.ShowUndo,
    });

    const undoState = getState().undo;
    if (!undoState) {
        throw new Error(
            `[Action:ShowUndo] Undo state did not get properly set after dispatching ShowUndo action type.`
        );
    }

    // Save the undo's index to ensure that we hide only this undo later
    const savedUndoIndex = undoState.index;
    setTimeout(() => {
        const undoState = getState().undo;
        if (undoState && undoState.index === savedUndoIndex) {
            dispatch(hideUndo());
        }
    }, 5000);
};

export interface PendingUndo {
    show: () => void;
}

/**
 * Prepares to execute a showUndo action by taking a snapshot of the current state tree which
 * will be restored if an ExecuteUndoAction is sent.
 * @param text Text to show to the user about the action that can be undone.
 */
export const createUndo = (text: string): ThunkResult<PendingUndo> => (
    dispatch,
    getState
) => {
    const savedState = getState();
    return {
        show: () => {
            dispatch(showUndo(text, savedState));
        },
    };
};

export interface HideUndoAction extends Action<UndoActionTypes.HideUndo> {}
export const hideUndo = (): HideUndoAction => ({
    type: UndoActionTypes.HideUndo,
});

export interface ExecuteUndoAction
    extends Action<UndoActionTypes.ExecuteUndo> {}
export const executeUndo = (): ExecuteUndoAction => ({
    type: UndoActionTypes.ExecuteUndo,
});

export type AllUndoActions =
    | ShowUndoAction
    | HideUndoAction
    | ExecuteUndoAction;
