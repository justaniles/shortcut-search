import * as React from "react";

import "./ShortcutsList.scss";

import { Shortcut } from "../interfaces";

export interface ShortcutsListProps {
    shortcuts: Shortcut[];
    activatedIndex: number;
    onClick: (shortcut: Shortcut) => void;
    onEditClick: (shortcut: Shortcut) => void;
}

interface ShortcutProps {
    shortcut: Shortcut;
    isActivated: boolean;
    onClick: () => void;
    onEditClick: () => void;
}
const ShortcutComponent = ({
    shortcut: { title, url, tags },
    isActivated,
    onClick,
    onEditClick,
}: ShortcutProps) => (
    <div
        className={"Shortcut " + (isActivated ? "--isActivated" : "")}
        onClick={onClick}
    >
        <h3 className="Shortcut__Title">{title || url}</h3>
        {title ? (
            <p className="Shortcut__Subtitle" title={url}>
                {url}
            </p>
        ) : null}
        {tags && tags.length ? (
            <p className="Shortcut__Subtitle">Tags: {tags.join(", ")}</p>
        ) : null}
        <div className="Shortcut__Edit">
            <button
                className="Shortcut__Edit__Button"
                onClick={e => {
                    e.stopPropagation();
                    onEditClick();
                }}
            >
                Edit
            </button>
        </div>
    </div>
);

export class ShortcutsList extends React.PureComponent<ShortcutsListProps> {
    public render() {
        const { shortcuts, activatedIndex } = this.props;
        return (
            <div className="ShortcutsList">
                <ol className="ShortcutsList__List">
                    {shortcuts.map((shortcut, index) => (
                        <li key={shortcut.id}>
                            <ShortcutComponent
                                shortcut={shortcut}
                                isActivated={index === activatedIndex}
                                onClick={this._onClick(shortcut)}
                                onEditClick={this._onEditClick(shortcut)}
                            />
                        </li>
                    ))}
                </ol>
            </div>
        );
    }

    private _onClick = (shortcut: Shortcut) => () => {
        this.props.onClick(shortcut);
    };

    private _onEditClick = (shortcut: Shortcut) => () => {
        this.props.onEditClick(shortcut);
    };
}
