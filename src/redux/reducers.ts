import { Reducer, combineReducers } from "redux";

import { ShortcutsState, AppState, Shortcut } from "../interfaces";
import {
    StartFetchShortcutsAction,
    EndFetchShortcutsAction,
    ActionTypes,
    UpdateFilterAction,
    ShortcutSelectedAction,
} from "./actions";

export const defaultShortcutsState: ShortcutsState = {
    loading: false,
    values: [],
    index: 0,
    filterText: "",
    filteredValues: [],
};

export const shortcutsReducer: Reducer<
    ShortcutsState,
    | StartFetchShortcutsAction
    | EndFetchShortcutsAction
    | UpdateFilterAction
    | ShortcutSelectedAction
> = (state, action) => {
    if (!state) {
        return defaultShortcutsState;
    }

    switch (action.type) {
        case ActionTypes.StartFetchShortcuts:
            return {
                ...state,
                loading: true,
            };
        case ActionTypes.EndFetchShortcuts:
            const shortcuts = action.shortcuts;
            return {
                ...state,
                loading: false,
                index: action.index,
                values: shortcuts,
                filteredValues: filterShortcuts(shortcuts, state.filterText),
            };
        case ActionTypes.UpdateFilter:
            const filterText = action.value;
            return {
                ...state,
                filterText,
                filteredValues: filterShortcuts(state.values, filterText),
            };
        case ActionTypes.ShortcutSelected:
            chrome.tabs.create({
                url: action.shortcut.url,
            });
    }

    return state;
};

export const rootReducer = combineReducers<AppState>({
    shortcuts: shortcutsReducer,
});

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
