import { connectRouter } from "connected-react-router";

/**
 * Creates a router reducer
 * @param history The history object
 * @returns The reducer
 */
export const createRouterReducer = history => connectRouter(history);
