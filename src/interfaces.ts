export interface EditableShortcutProperties {
    readonly title: string;
    readonly url: string;
    readonly tags: string[];
}

export interface Shortcut extends EditableShortcutProperties {
    readonly id: number;
}

export type EditingState =
    | { id: number; isNew?: undefined }
    | { id?: undefined; isNew: true };

export interface ShortcutsState {
    readonly loading: boolean;
    readonly values: Shortcut[];
    readonly index: number;
    readonly filterText: string;
    readonly filteredValues: Shortcut[];
    readonly editing?: EditingState;
}

export type UndoState = {
    index: number;
    isVisible: boolean;
    text?: string;
    state?: AppState;
};

export interface AppState {
    readonly shortcuts: ShortcutsState;
    readonly undo: UndoState;
}
