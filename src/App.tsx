import * as React from "react";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { hot } from "react-hot-loader/root";
import { Switch, Redirect } from "react-router";
import universal from "react-universal-component";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { Store } from "redux";
import { History } from "history";

import Wrapper from "./components/Wrapper";
import Frontpage from "./containers/Frontpage";
import Page404 from "./components/Page404";
import Meetup from "./containers/Meetup";

const API_URL: string = process.env.API_URL || "";

// const Product = universalWithLoadingBar(props =>
//   import(/* webpackChunkName: "product" */ "./containers/Product")
// );

interface Props {
  history: History;
  store: Store;
}

const client = new ApolloClient({
  uri: API_URL
});

const App: React.SFC<Props> = ({ history, store }) => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ConnectedRouter history={history}>
          <Wrapper>
            <Switch>
              <Route exact path={`/`} component={Frontpage} />
              <Route path={`/meetup/:id`} component={Meetup} />
              <Route path={`/meetup/:id/:token`} component={Meetup} />
              <Route component={Page404} />
            </Switch>
          </Wrapper>
        </ConnectedRouter>
      </ApolloProvider>
    </Provider>
  );
};

export default hot(App);
