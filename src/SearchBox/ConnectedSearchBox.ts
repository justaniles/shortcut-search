import { MapDispatchToProps, connect } from "react-redux";

import { AppState } from "../interfaces";
import { SearchBoxProps, SearchBox } from "./SearchBox";
import { updateFilter } from "../redux/actions";

const mapStateToProps = ({
    shortcuts,
}: AppState): Pick<SearchBoxProps, "text" | "requestFocus"> => ({
    text: shortcuts.filterText,
    requestFocus: true,
});

const mapDispatchToProps: MapDispatchToProps<
    Pick<SearchBoxProps, "onUpdate">,
    void
> = dispatch => ({
    onUpdate: newText => {
        dispatch(updateFilter(newText));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBox);
