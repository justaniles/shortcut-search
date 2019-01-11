import * as React from "react";

import "./ShortcutsList.scss";

import { Shortcut } from "../interfaces";

export interface ShortcutsListProps {
    shortcuts: Shortcut[];
    activatedIndex: number;
    onClick: (shortcut: Shortcut) => void;
    onEditClick: (shortcut: Shortcut) => void;
}

export class ShortcutsList extends React.PureComponent<ShortcutsListProps> {
    render() {
        const { shortcuts, activatedIndex, onClick } = this.props;
        return (
            <div className="shortcuts">
                <ol className="shortcuts-list">
                    {shortcuts.map((shortcut, index) => {
                        return (
                            <li>
                                <button
                                    className={
                                        "shortcut " +
                                        (index === activatedIndex
                                            ? "--isActivated"
                                            : "")
                                    }
                                    onClick={this._onClick.bind(this, shortcut)}
                                >
                                    <h3 className="shortcut__title">
                                        {shortcut.title}
                                    </h3>
                                    <p
                                        className="shortcut__url"
                                        title={shortcut.url}
                                    >
                                        {shortcut.url}
                                    </p>
                                    <p className="shortcut__tags">
                                        Tags: {shortcut.tags.join(", ")}
                                    </p>
                                    <div className="shortcut__edit">
                                        <button
                                            className="shortcut-edit__button"
                                            onClick={this._onEditClick.bind(
                                                this,
                                                shortcut
                                            )}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </button>
                            </li>
                        );
                    })}
                </ol>
            </div>
        );
    }

    private _onClick = (shortcut: Shortcut): void => {
        this.props.onClick(shortcut);
    };

    private _onEditClick = (shortcut: Shortcut): void => {
        this.props.onEditClick(shortcut);
    };
}
