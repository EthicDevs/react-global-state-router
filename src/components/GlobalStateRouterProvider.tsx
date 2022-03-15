import React, { FC, useCallback, useMemo } from "react";
import { useSelect, useStore } from "@ethicdevs/react-global-state-hooks";

//import { ErrorBoundary } from "../components/ErrorsBoundary";
import { GlobalStateRouterContext } from "../context";
import { ActionTypes, selectPreviousScreen } from "../state";
import { getScreenPathname } from "../helpers";

export const GlobalStateRouterProvider: FC = ({ children }) => {
  const { dispatch, action } = useStore();
  const prevScreen = useSelect(selectPreviousScreen);

  const reset = useCallback(() => {
    dispatch(
      action({
        type: ActionTypes.RESET,
      }),
    );
  }, [action, dispatch]);

  const push = useCallback(
    (screen: string, ...args: unknown[]) => {
      window.history.pushState(
        { t: "push", screen, args },
        "",
        getScreenPathname(screen),
      );
      dispatch(
        action({
          type: ActionTypes.PUSH,
          payload: {
            screen,
            args,
          },
        }),
      );
    },
    [action, dispatch],
  );

  const replace = useCallback(
    (screen: string, ...args: unknown[]) => {
      window.history.pushState(
        { t: "replace", screen, args },
        "",
        getScreenPathname(screen),
      );
      dispatch(
        action({
          type: ActionTypes.REPLACE,
          payload: {
            screen,
            args,
          },
        }),
      );
    },
    [action, dispatch],
  );

  const pop = useCallback(() => {
    if (prevScreen != null) {
      dispatch(
        action({
          type: ActionTypes.POP,
        }),
      );
    }
  }, [action, dispatch, prevScreen]);

  const ctxValue = useMemo(
    () => ({
      reset,
      push,
      replace,
      pop,
    }),
    [reset, push, replace, pop],
  );

  return (
    <GlobalStateRouterContext.Provider value={ctxValue}>
      {children}
    </GlobalStateRouterContext.Provider>
  );
};
