export interface Shortcut {
    readonly id: number;
    readonly title: string;
    readonly url: string;
    readonly tags: string[];
}

export interface ShortcutsState {
    readonly loading: boolean;
    readonly values: Shortcut[];
    readonly index: number;
    readonly filterText: string;
    readonly filteredValues: Shortcut[];
}

export interface AppState {
    readonly shortcuts: ShortcutsState;
}
