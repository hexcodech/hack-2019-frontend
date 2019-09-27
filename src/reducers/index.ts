import { combineReducers, Reducer } from "redux";

import burgerMenu, * as fromBurgerMenu from "./burger-menu";
import { createRouterReducer } from "./router";
import { History } from "history";

/**
 * Wraps a function, useful for redux getters
 * @param target The function to wrap
 * @param mapState Maps the state to the part that should be passed
 * @returns The wrapped function
 */
export const wrap = <T>(
  target: (...args: Array<any>) => T,
  mapState: (state: any) => any = ({}) => ({})
) => (state: {}, ...args: Array<any>) => target(mapState(state), ...args);

export interface ApplicationState {
  router: { [key: string]: any };
  burgerMenu: { [key: string]: any };
}

/**
 * Checks whether the burger menu is open
 * @param state This state
 * @returns Whether the burger menu is open
 */
export const getBurgerMenuOpen = wrap(
  fromBurgerMenu.getBurgerMenuOpen,
  (state: ApplicationState) => state.burgerMenu
);

const createAppReducer = (history: History) =>
  combineReducers({
    router: createRouterReducer(history),
    burgerMenu
  });

/**
 * Creates the root reducer based on the app reducer
 * Make sure that the state is removed if the user signed out of the application.
 * @param appReducer The app reducer
 * @returns The root reducer
 */
const rootReducer = (appReducer: Reducer) => (
  state: { [key: string]: any },
  action: { type: string; [key: string]: any }
) => {
  if (action.type === "LOGOUT_USER") {
    state = undefined;
  }

  return appReducer(state, action);
};

/**
 * Creates the root reducer
 * @param history The history object
 * @returns The root reducer
 */
export const createRootReducer = (history: History) =>
  rootReducer(createAppReducer(history));
