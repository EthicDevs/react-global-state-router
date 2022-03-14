import React, { FC, useCallback, useMemo } from "react";
import { useStore } from "@ethicdevs/react-global-state-hooks";

import { GlobalStateRouterContext } from "../context";
import { ActionTypes } from "../state";

export const GlobalStateRouterProvider: FC = ({ children }) => {
  const { dispatch, action } = useStore();

  const reset = useCallback(() => {
    dispatch(
      action({
        type: ActionTypes.RESET,
      }),
    );
  }, [action, dispatch]);

  const push = useCallback(
    (screen: string, ...args: unknown[]) => {
      const searchParams = new URLSearchParams(
        (args?.[0] as Record<string, string>) || (String("") as string) || [],
      );
      const url = `${window.location.origin}/${screen
        .replace(/Screen$/i, "")
        .toLocaleLowerCase()}${
        searchParams.toString().trim() !== ""
          ? `?${searchParams.toString()}`
          : ""
      }`;
      window.history.pushState({ t: "push", screen, args }, "", url);
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
      const searchParams = new URLSearchParams(
        (args?.[0] as Record<string, string>) || (String("") as string) || [],
      );
      const url = `${window.location.origin}/${screen
        .replace(/Screen$/i, "")
        .toLocaleLowerCase()}${
        searchParams.toString().trim() !== ""
          ? `?${searchParams.toString()}`
          : ""
      }`;
      window.history.pushState({ t: "replace", screen, args }, "", url);
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
    dispatch(
      action({
        type: ActionTypes.POP,
      }),
    );
  }, [action, dispatch]);

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
