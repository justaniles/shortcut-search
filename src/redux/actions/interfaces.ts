import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { AppState } from "../../interfaces";
import { AllActions } from "./index";

export type ThunkResult<TResult = void> = ThunkAction<
    TResult,
    AppState,
    void,
    AllActions
>;
export type ThunkDispatch = ThunkDispatch<AppState, void, AllActions>;
