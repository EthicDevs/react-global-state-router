import { Reducer } from "react";
import {
  FluxBaseState,
  FluxStandardAction,
} from "@ethicdevs/react-global-state-hooks";

import { ActionType, ActionTypes } from "./actionTypes";

export interface GlobalStateRouterState extends FluxBaseState {
  screens: [string, unknown[]][];
}

// Initial state
export const initialState: GlobalStateRouterState = {
  screens: [],
};

export const reducer: Reducer<
  GlobalStateRouterState,
  FluxStandardAction<ActionType>
> = (state, action) => {
  switch (action.type) {
    case ActionTypes.RESET: {
      return {
        screens: [],
      };
    }
    case ActionTypes.PUSH: {
      const { screen, args } = action.payload as {
        screen: string;
        args: unknown[];
      };

      if (screen === state.screens[state.screens.length - 1]?.[0]) {
        return state;
      }

      return {
        screens: [...state.screens.filter(Boolean), [screen, args]],
      };
    }
    case ActionTypes.REPLACE: {
      const { screen, args } = action.payload as {
        screen: string;
        args: unknown[];
      };

      if (screen === state.screens[state.screens.length - 1]?.[0]) {
        return state;
      }

      let nextScreens = [...state.screens];
      delete nextScreens[nextScreens.length - 1];

      return {
        screens: [...nextScreens.filter(Boolean), [screen, args]],
      };
    }
    case ActionTypes.POP: {
      let nextScreens = [...state.screens];
      delete nextScreens[nextScreens.length - 1];

      return {
        screens: nextScreens.filter(Boolean),
      };
    }
    default: {
      return state;
    }
  }
};
