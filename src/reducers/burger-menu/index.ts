/**
 * The burger menu reducer
 * @param state The redux state
 * @param action The dispatched action
 * @returns The new state
 */
const burgerMenuReducer = (
  state = false,
  action: { type: string; [key: string]: any }
) => {
  switch (action.type) {
    case "TOGGLE_BURGER_MENU":
      return !state;
    default:
      return state;
  }
};

export default burgerMenuReducer;

/**
 * Gets all countries
 * @param state The redux state
 * @returns Whether the burger menu is open
 */
export const getBurgerMenuOpen = (state: boolean) => state;
