import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getBurgerMenuOpen, ApplicationState } from "../reducers";
import { Location } from "history";
import { ThunkDispatch } from "redux-thunk";
import { toggleBurgerMenu } from "../actions/burger-menu";
import { AnyAction } from "redux";

interface Props {
  location: Location;
  burgerMenuOpen: boolean;
  dispatch: ThunkDispatch<void, void, AnyAction>;
}

class ScrollToTop extends React.Component<Props> {
  componentDidUpdate(prevProps: Props) {
    if (this.props.location !== prevProps.location) {
      if (this.props.burgerMenuOpen) {
        this.props.dispatch(toggleBurgerMenu());
      }
      window.scrollTo({ left: 0, top: 0 });
    }
  }

  render() {
    return this.props.children;
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  burgerMenuOpen: getBurgerMenuOpen(state)
});
const ConnectedScrollToTop = connect(mapStateToProps)(ScrollToTop);

export default withRouter(ConnectedScrollToTop);
