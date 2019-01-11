import { Action, ActionCreator } from "redux";
import { Shortcut } from "../interfaces";

export enum ActionTypes {
    StartFetchShortcuts = "startFetchShortcuts",
    EndFetchShortcuts = "endFetchShortcuts",
    UpdateFilter = "updateFilter",
    ShortcutSelected = "shortcutSelected",
}

export interface StartFetchShortcutsAction
    extends Action<ActionTypes.StartFetchShortcuts> {}
export const startFetchShortcuts = (): StartFetchShortcutsAction => ({
    type: ActionTypes.StartFetchShortcuts,
});

export interface EndFetchShortcutsAction
    extends Action<ActionTypes.EndFetchShortcuts> {
    shortcuts: Shortcut[];
    index: number;
}
export const endFetchShortcuts = (
    shortcuts: Shortcut[],
    index: number
): EndFetchShortcutsAction => ({
    shortcuts,
    index,
    type: ActionTypes.EndFetchShortcuts,
});

export interface UpdateFilterAction extends Action<ActionTypes.UpdateFilter> {
    value: string;
}
export const updateFilter = (value: string): UpdateFilterAction => ({
    value,
    type: ActionTypes.UpdateFilter,
});

export interface ShortcutSelectedAction
    extends Action<ActionTypes.ShortcutSelected> {
    shortcut: Shortcut;
}
export const shortcutSelected = (
    shortcut: Shortcut
): ShortcutSelectedAction => ({
    shortcut,
    type: ActionTypes.ShortcutSelected,
});
