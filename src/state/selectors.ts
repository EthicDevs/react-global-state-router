import { FluxBaseState } from "@ethicdevs/react-global-state-hooks";

import { modKey } from "./actionTypes";
import { GlobalStateRouterState } from "./reducer";

type State = {
  [x: string]: FluxBaseState;
  [modKey]: GlobalStateRouterState;
};

export const selectCurrentScreen = (state: State) => {
  const { screens } = state.router;
  return screens[screens.length - 1];
};

export const selectPreviousScreen = (state: State) => {
  const { screens } = state.router;
  return screens[screens.length - 2];
};
