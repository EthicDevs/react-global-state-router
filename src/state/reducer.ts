import { Reducer } from "react";
import {
  FluxBaseState,
  FluxStandardAction,
} from "@ethicdevs/react-global-state-hooks";

import { ActionType, ActionTypes, modKey } from "./actionTypes";
import { selectPreviousScreen } from "./selectors";

export interface GlobalStateRouterState extends FluxBaseState {
  initialScreen: string;
  screens: [string, unknown[]][];
}

// Initial state
export const initialState: GlobalStateRouterState = {
  initialScreen: "",
  screens: [],
};

export const reducer: Reducer<
  GlobalStateRouterState,
  FluxStandardAction<ActionType>
> = (state, action) => {
  const prevScreen = selectPreviousScreen({
    [modKey]: state,
  });

  switch (action.type) {
    case ActionTypes.RESET: {
      return initialState;
    }
    case ActionTypes.SET_INITIAL_SCREEN: {
      const { initialScreen, args } = action.payload as {
        initialScreen: string;
        args: unknown[];
      };
      return {
        ...state,
        initialScreen,
        screens: [[initialScreen, args]],
      };
    }
    case ActionTypes.PUSH: {
      const { screen, args } = action.payload as {
        screen: string;
        args: unknown[];
      };

      if (prevScreen != null && screen === prevScreen[0]) {
        return state;
      }

      return {
        ...state,
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
        ...state,
        screens: [...nextScreens.filter(Boolean), [screen, args]],
      };
    }
    case ActionTypes.POP: {
      let nextScreens = [...state.screens];
      delete nextScreens[nextScreens.length - 1];

      return {
        ...state,
        screens: nextScreens.filter(Boolean),
      };
    }
    default: {
      return state;
    }
  }
};
