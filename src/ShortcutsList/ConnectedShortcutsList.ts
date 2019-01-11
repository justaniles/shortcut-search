import { ShortcutsListProps, ShortcutsList } from "./ShortcutsList";
import { AppState } from "../interfaces";
import { MapDispatchToProps, connect } from "react-redux";
import { shortcutSelected } from "../redux/actions";

const mapStateToProps = ({
    shortcuts,
}: AppState): Pick<ShortcutsListProps, "shortcuts" | "activatedIndex"> => ({
    shortcuts: shortcuts.filteredValues,
    activatedIndex: 0,
});

const mapDispatchToProps: MapDispatchToProps<
    Pick<ShortcutsListProps, "onClick" | "onEditClick">,
    void
> = dispatch => ({
    onClick: shortcut => {
        dispatch(shortcutSelected(shortcut));
    },
    onEditClick: shortcut => {},
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShortcutsList);
