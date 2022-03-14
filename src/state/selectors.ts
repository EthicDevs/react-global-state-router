import { FluxBaseState } from "@ethicdevs/react-global-state-hooks";

import { modKey } from "./actionTypes";
import { GlobalStateRouterState } from "./reducer";

type State = {
  [x: string]: FluxBaseState;
  [modKey]: GlobalStateRouterState;
};

export const selectCurrentScreen = (state: State) => {
  return state?.router?.screens != null && state.router.screens.length >= 1
    ? state.router.screens[state.router.screens.length - 1]
    : null;
};

export const selectPreviousScreen = (state: State) => {
  return state?.router?.screens != null && state.router.screens.length >= 2
    ? state.router.screens[state.router.screens.length - 2]
    : null;
};
