import { Action } from "redux";

import {
    Shortcut,
    EditingState,
    EditableShortcutProperties,
} from "../../interfaces";
import * as SettingsManager from "../../settings-manager";
import { ThunkResult } from "./interfaces";
import { createUndo } from "./undo";

export enum ShortcutActionTypes {
    StartFetchSettings = "startFetchSettings",
    EndFetchSettings = "endFetchSettings",
    UpdateFilter = "updateFilter",
    ShortcutSelected = "shortcutSelected",
    StartEditing = "startEditing",
    FinishEditing = "finishEditing",
    CancelEditing = "cancelEditing",
    DeleteShortcut = "deleteShortcut",
}

export interface StartFetchSettingsAction
    extends Action<ShortcutActionTypes.StartFetchSettings> {}
export const fetchSettings = (): ThunkResult<Promise<void>> => dispatch => {
    dispatch({
        type: ShortcutActionTypes.StartFetchSettings,
    });

    return SettingsManager.fetchSettings().then(settings => {
        dispatch(endFetchSettings(settings));
    });
};

export interface EndFetchSettingsAction
    extends Action<ShortcutActionTypes.EndFetchSettings> {
    settings: SettingsManager.Settings;
}
export const endFetchSettings = (
    settings: SettingsManager.Settings
): EndFetchSettingsAction => ({
    settings,
    type: ShortcutActionTypes.EndFetchSettings,
});

export interface UpdateFilterAction
    extends Action<ShortcutActionTypes.UpdateFilter> {
    value: string;
}
export const updateFilter = (value: string): UpdateFilterAction => ({
    value,
    type: ShortcutActionTypes.UpdateFilter,
});

export interface ShortcutSelectedAction
    extends Action<ShortcutActionTypes.ShortcutSelected> {
    shortcut: Shortcut;
}
export const shortcutSelected = (
    shortcut: Shortcut
): ShortcutSelectedAction => ({
    shortcut,
    type: ShortcutActionTypes.ShortcutSelected,
});

export interface StartEditingAction
    extends Action<ShortcutActionTypes.StartEditing> {
    editing: EditingState;
}
export const startEditing = (editing: EditingState): StartEditingAction => ({
    editing,
    type: ShortcutActionTypes.StartEditing,
});

export interface FinishEditingAction
    extends Action<ShortcutActionTypes.FinishEditing> {
    editedShortcut: EditableShortcutProperties;
}
export const finishEditing = (
    editedShortcut: EditableShortcutProperties
): ThunkResult<Promise<any>> => (dispatch, getState) => {
    dispatch({
        editedShortcut,
        type: ShortcutActionTypes.FinishEditing,
    });

    const shortcutsState = getState().shortcuts;
    return SettingsManager.updateSettings({
        shortcuts: shortcutsState.values,
        index: shortcutsState.index,
    });
};

export interface CancelEditingAction
    extends Action<ShortcutActionTypes.CancelEditing> {}
export const cancelEditing = (): CancelEditingAction => ({
    type: ShortcutActionTypes.CancelEditing,
});

export const createNew = (): ThunkResult => dispatch => {
    dispatch(
        startEditing({
            isNew: true,
        })
    );
};

export interface DeleteShortcutAction
    extends Action<ShortcutActionTypes.DeleteShortcut> {
    id: number;
}

export const deleteShortcut = (id: number): ThunkResult => dispatch => {
    const undo = dispatch(createUndo("Deleted shortcut"));

    dispatch({
        id,
        type: ShortcutActionTypes.DeleteShortcut,
    });

    undo.show();
};

export type AllShortcutActions =
    | StartFetchSettingsAction
    | EndFetchSettingsAction
    | UpdateFilterAction
    | ShortcutSelectedAction
    | StartEditingAction
    | CancelEditingAction
    | FinishEditingAction
    | DeleteShortcutAction;
