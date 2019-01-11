import * as React from "react";

import "./SearchBox.scss";

export interface SearchBoxProps {
    text: string;
    onUpdate: (newText: string) => void;
    requestFocus?: boolean;
}

export class SearchBox extends React.PureComponent<SearchBoxProps> {
    private _searchBox: React.RefObject<HTMLInputElement>;

    constructor(props: SearchBoxProps) {
        super(props);

        this._searchBox = React.createRef();
    }

    componentDidMount() {
        const searchBox = this._searchBox.current;
        if (this.props.requestFocus && searchBox) {
            searchBox.focus();
        }
    }

    render() {
        return (
            <div className="searchbox">
                <input
                    className="searchbox__input"
                    type="text"
                    placeholder="Search"
                    value={this.props.text}
                    onInput={this._onUpdate}
                    ref={this._searchBox}
                />
            </div>
        );
    }

    private _onUpdate = (event: React.FormEvent): void => {
        this.props.onUpdate(event.currentTarget.nodeValue || "");
    };
}
