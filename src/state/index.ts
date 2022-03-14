import { StateModule } from "@ethicdevs/react-global-state-hooks";

import { ActionTypes, modKey } from "./actionTypes";
import { GlobalStateRouterState, initialState, reducer } from "./reducer";

// lib

export * from "./actionTypes";
export * from "./reducer";
export * from "./selectors";

export const GlobalStateRouterStateModule: Record<
  typeof modKey,
  StateModule<GlobalStateRouterState>
> = {
  [modKey]: {
    key: modKey,
    actionTypes: ActionTypes,
    initialState,
    reducer,
  },
};
