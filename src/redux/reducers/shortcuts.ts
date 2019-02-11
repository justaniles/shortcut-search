import { Reducer } from "redux";

import { ShortcutsState, Shortcut } from "../../interfaces";
import { ShortcutActionTypes, AllActions } from "../actions";

export const defaultShortcutsState: ShortcutsState = {
    loading: false,
    values: [],
    index: 0,
    filterText: "",
    filteredValues: [],
};

export const shortcutsReducer: Reducer<ShortcutsState, AllActions> = (
    state,
    action
) => {
    if (!state) {
        return defaultShortcutsState;
    }

    switch (action.type) {
        case ShortcutActionTypes.StartFetchSettings:
            return {
                ...state,
                loading: true,
            };
        case ShortcutActionTypes.EndFetchSettings:
            const settings = action.settings;
            const fetchedShortcuts = settings.shortcuts;
            return {
                ...state,
                loading: false,
                index: settings.index,
                values: fetchedShortcuts,
                filteredValues: filterShortcuts(
                    fetchedShortcuts,
                    state.filterText
                ),
            };
        case ShortcutActionTypes.UpdateFilter:
            const filterText = action.value;
            return {
                ...state,
                filterText,
                filteredValues: filterShortcuts(state.values, filterText),
            };
        case ShortcutActionTypes.ShortcutSelected:
            chrome.tabs.create({
                url: action.shortcut.url,
            });
            break;
        case ShortcutActionTypes.StartEditing:
            if (state.editing) {
                throw new Error(
                    "[Reducer:StartEditing] Already in editing state, can't start new editing."
                );
            }
            return {
                ...state,
                editing: action.editing,
            };
        case ShortcutActionTypes.CancelEditing:
            if (!state.editing) {
                throw new Error(
                    "[Reducer:CancelEditing] No editing state found to cancel."
                );
            }
            return {
                ...state,
                editing: undefined,
            };
        case ShortcutActionTypes.FinishEditing:
            if (!state.editing) {
                throw new Error(
                    "[Reducer:FinishEditing] No editing state found to finish."
                );
            }

            const editingState = state.editing;
            const shortcuts = state.values;
            const editedShortcut = action.editedShortcut;

            if (editingState.isNew) {
                // New shortcut, append to shortcut array and increment index
                const idIndex = state.index;
                return {
                    ...state,
                    values: [
                        ...shortcuts,
                        {
                            ...editedShortcut,
                            id: idIndex,
                        },
                    ],
                    index: idIndex + 1,
                    editing: undefined,
                };
            }

            // Existing shortcut, find its index and slice it into the shortcuts array
            const editingId = editingState.id;
            const shortcutIndex = shortcuts.findIndex(
                shortcut => shortcut.id === editingId
            );
            if (shortcutIndex === -1) {
                throw new Error(
                    `[Reducer:FinishEditing] Could not find an existing shortcut with id '${editingId}' to save edits to.`
                );
            }

            const newValues = [
                ...shortcuts.slice(0, shortcutIndex),
                {
                    ...editedShortcut,
                    id: editingId,
                },
                ...shortcuts.slice(shortcutIndex + 1),
            ];

            return {
                ...state,
                values: newValues,
                filteredValues: filterShortcuts(newValues, state.filterText),
                editing: undefined,
            };
        case ShortcutActionTypes.DeleteShortcut:
            const deleteIndex = state.values.findIndex(
                shortcut => shortcut.id === action.id
            );
            if (deleteIndex === -1) {
                throw new Error(
                    `[Reducer:DeleteShortcut] Could not find a shortcut with id '${
                        action.id
                    }' to delete.`
                );
            }

            const valuesWithoutDeletedShortcut = [
                ...state.values.slice(0, deleteIndex),
                ...state.values.slice(deleteIndex + 1),
            ];
            return {
                ...state,
                values: valuesWithoutDeletedShortcut,
                filteredValues: filterShortcuts(
                    valuesWithoutDeletedShortcut,
                    state.filterText
                ),
            };
    }

    return state;
};

function filterShortcuts(
    allShortcuts: Shortcut[],
    filterText?: string
): Shortcut[] {
    let filteredShortcuts = allShortcuts;

    if (filterText && allShortcuts.length) {
        const searchWords = filterText.toLowerCase().split(" ");
        const numSearchWords = searchWords.length;
        const matchingItems: {
            searchScore: number;
            savedPage: Shortcut;
        }[] = [];
        allShortcuts.forEach(item => {
            // Determine search score based on number of hits
            let searchScore = 0;
            let wordsMatch = 0;
            searchWords.forEach(searchWord => {
                const matchCount =
                    +item.title.toLowerCase().includes(searchWord) +
                    +item.url.toLowerCase().includes(searchWord) +
                    +item.tags.some(tag =>
                        tag.toLowerCase().includes(searchWord)
                    );
                searchScore += matchCount;

                if (matchCount) {
                    wordsMatch++;
                }
            });

            if (wordsMatch >= numSearchWords) {
                matchingItems.push({
                    searchScore: searchScore,
                    savedPage: item,
                });
            }
        });

        filteredShortcuts = matchingItems
            .sort((item1, item2) => {
                const comparison = item2.searchScore - item1.searchScore;
                return comparison && comparison < 0 ? -1 : 1;
            })
            .map(item => item.savedPage);
    }

    return filteredShortcuts;
}
