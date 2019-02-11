import { AllUndoActions } from "./undo";
import { AllShortcutActions } from "./shortcuts";

export * from "./shortcuts";
export * from "./undo";

export type AllActions = AllShortcutActions | AllUndoActions;
