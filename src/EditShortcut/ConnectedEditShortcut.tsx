import * as React from "react";
import { MapDispatchToProps, connect } from "react-redux";

import { AppState, Shortcut, EditableShortcutProperties } from "../interfaces";
import { EditShortcut, EditShortcutProps } from "./EditShortcut";
import { cancelEditing, finishEditing, deleteShortcut } from "../redux/actions";
import { ThunkDispatch } from "../redux/actions/interfaces";

type EditShortcutContainerProps = {
    visible: boolean;
    editingShortcut?: Shortcut;
    isNew?: boolean;
};

type DispatchProps = Pick<EditShortcutProps, "onCancel" | "onFinish"> & {
    onDelete: (id: number) => void;
};

const mapStateToProps = ({
    shortcuts,
}: AppState): EditShortcutContainerProps => {
    const editingState = shortcuts.editing;
    if (!editingState) {
        return {
            visible: false,
        };
    }

    if (editingState.isNew) {
        // Creating new
        return {
            editingShortcut: {
                id: -1,
                title: "",
                url: "",
                tags: [],
            },
            visible: true,
            isNew: true,
        };
    }

    // Editing existing
    const editingId = editingState.id;
    const shortcutToEdit = shortcuts.values.find(
        shortcut => shortcut.id === editingId
    );
    if (!shortcutToEdit) {
        console.error(
            `[ConnectedEditShortcut] Could not find a shortcut with id '${editingId}' to edit. Aborting opening EditShortcut.`
        );
        return {
            visible: false,
        };
    }

    return {
        editingShortcut: {
            ...shortcutToEdit,
        },
        visible: true,
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch): DispatchProps => ({
    onCancel: () => {
        dispatch(cancelEditing());
    },
    onFinish: (editedShortcut: EditableShortcutProperties) => {
        dispatch(finishEditing(editedShortcut));
    },
    onDelete: (id: number) => {
        dispatch(cancelEditing());
        dispatch(deleteShortcut(id));
    },
});

const ConnectedEditShortcut = (
    props: EditShortcutContainerProps & DispatchProps
) => {
    const editingShortcut = props.editingShortcut;
    return props.visible && editingShortcut ? (
        <EditShortcut
            editingShortcut={editingShortcut}
            isNew={!!props.isNew}
            onCancel={props.onCancel}
            onFinish={props.onFinish}
            onDelete={props.onDelete.bind(null, editingShortcut.id)}
        />
    ) : null;
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedEditShortcut);
