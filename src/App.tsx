import * as React from "react";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { hot } from "react-hot-loader/root";
import { Switch, Redirect } from "react-router";
import universal from "react-universal-component";
import { Store } from "redux";
import { History } from "history";

import Wrapper from "./components/Wrapper";
import Frontpage from "./containers/Frontpage";
import Page404 from "./components/Page404";

// const Product = universalWithLoadingBar(props =>
//   import(/* webpackChunkName: "product" */ "./containers/Product")
// );

interface Props {
  history: History;
  store: Store;
}

const App: React.SFC<Props> = ({ history, store }) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Wrapper>
          <Switch>
            <Route exact path={`/`} component={Frontpage} />
            <Route component={Page404} />
          </Switch>
        </Wrapper>
      </ConnectedRouter>
    </Provider>
  );
};

export default hot(App);
