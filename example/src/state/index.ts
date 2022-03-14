import { combineModules } from "@ethicdevs/react-global-state-hooks";
import { GlobalStateRouterStateModule } from "@ethicdevs/react-global-state-router";

import { AuthModule } from "./auth";

// Auto export everything needed for the Provider
export const { ActionTypes, rootReducer, initialState } = combineModules({
  ...GlobalStateRouterStateModule,
  auth: AuthModule,
});
