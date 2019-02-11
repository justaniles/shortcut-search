import * as React from "react";

import "./EditShortcut.scss";
import { EditableShortcutProperties } from "../interfaces";

export interface EditShortcutProps {
    onFinish: (editedShortcut: EditableShortcutProperties) => void;
    onCancel: () => void;
    onDelete: () => void;
    editingShortcut: EditableShortcutProperties;
    isNew: boolean;
}

export interface EditShortcutState {
    title: string;
    url: string;
    tags: string;
}

export class EditShortcut extends React.Component<
    EditShortcutProps,
    EditShortcutState
> {
    private _titleTextBox: React.RefObject<HTMLInputElement>;

    constructor(props: EditShortcutProps) {
        super(props);

        this._titleTextBox = React.createRef();

        const editingShortcut = props.editingShortcut;
        if (editingShortcut) {
            this.state = {
                title: editingShortcut.title,
                url: editingShortcut.url,
                tags: editingShortcut.tags.join(", "),
            };
        }
    }

    public componentDidMount() {
        const titleTextBox = this._titleTextBox.current;
        if (titleTextBox) {
            titleTextBox.focus();
        }
    }

    public render() {
        const state = this.state;

        return (
            <div className="EditShortcut" onClick={e => e.stopPropagation()}>
                {this.props.isNew ? (
                    <div className="EditShortcut-Header">
                        <h2 className="title is-3">Create shortcut</h2>
                    </div>
                ) : (
                    <div className="EditShortcut-Header">
                        <h2 className="title is-3">Edit shortcut</h2>
                        <div className="EditShortcut-Header__Actions">
                            <button
                                className="EditShortcut-Delete button"
                                onClick={this._delete}
                            >
                                <span className="icon">
                                    <i
                                        className="far fa-trash-alt"
                                        title="Delete shortcut"
                                    />
                                </span>
                            </button>
                        </div>
                    </div>
                )}
                <form onSubmit={this._finishEditing}>
                    <div className="field">
                        <label>Title</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                placeholder="E.g. 'My work items'"
                                value={state.title}
                                onChange={this._setTitle}
                                ref={this._titleTextBox}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label>Url</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                placeholder="E.g. 'https://microsoft.com'"
                                value={state.url}
                                onChange={this._setUrl}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label>Tags (comma-separated)</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                placeholder="E.g. 'work,build'"
                                value={state.tags}
                                onChange={this._setTags}
                            />
                        </div>
                    </div>
                </form>
                <div className="EditShortcut-Footer">
                    <button
                        className="EditShortcut-Footer__Action button is-white"
                        onClick={this._cancelEditing}
                    >
                        Cancel
                    </button>
                    <button
                        className="EditShortcut-Footer__Action button is-primary"
                        onClick={this._finishEditing}
                    >
                        Done
                    </button>
                </div>
            </div>
        );
    }

    private _setTitle = (event: React.FormEvent<HTMLInputElement>): void => {
        this.setState({
            title: event.currentTarget.value,
        });
    };

    private _setUrl = (event: React.FormEvent<HTMLInputElement>): void => {
        this.setState({
            url: event.currentTarget.value,
        });
    };

    private _setTags = (event: React.FormEvent<HTMLInputElement>): void => {
        this.setState({
            tags: event.currentTarget.value,
        });
    };

    private _delete = (): void => {
        this.props.onDelete();
    };

    private _cancelEditing = (): void => {
        this.props.onCancel();
    };

    private _finishEditing = (): void => {
        const state = this.state;
        this.props.onFinish({
            title: state.title,
            url: state.url,
            tags: state.tags.split(",").map(str => str.trim()),
        });
    };
}
