import React, { FC, useCallback, useMemo } from "react";
import { useSelect, useStore } from "@ethicdevs/react-global-state-hooks";

import { GlobalStateRouterContext } from "../context";
import { ActionTypes, selectPreviousScreen } from "../state";

const getScreenUrl = (screen: string, args: unknown[]): string => {
  const searchParams = new URLSearchParams(
    (args?.[0] as Record<string, string>) || (String("") as string) || [],
  );

  return `${window.location.origin}/${screen
    .replace(/Screen$/i, "")
    .toLocaleLowerCase()}${
    searchParams.toString().trim() !== "" ? `?${searchParams.toString()}` : ""
  }`;
};

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
        getScreenUrl(screen, args),
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
        getScreenUrl(screen, args),
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
    const [previousScreen, previousScreenArgs] = prevScreen;
    window.history.pushState(
      { t: "replace", screen: previousScreen, args: previousScreenArgs },
      "",
      getScreenUrl(previousScreen, previousScreenArgs),
    );
    dispatch(
      action({
        type: ActionTypes.POP,
      }),
    );
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
