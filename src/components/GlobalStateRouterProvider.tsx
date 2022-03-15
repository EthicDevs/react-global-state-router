import React, { FC, useCallback, useEffect, useMemo } from "react";
import { useSelect, useStore } from "@ethicdevs/react-global-state-hooks";

//import { ErrorBoundary } from "../components/ErrorsBoundary";
import { ActionTypes, selectPreviousScreen } from "../state";
import { GlobalStateRouterContext } from "../context";
import {
  Logger,
  LoggerType,
  OnPopStateLogger,
  PushStateLogger,
  ReplaceStateLogger,
} from "../types";
import { getConsoleLogger, getScreenPathname } from "../helpers";

type GlobalStateRouterProviderProps = {
  getLogger?: (type: LoggerType) => Logger;
};

export const GlobalStateRouterProvider: FC<GlobalStateRouterProviderProps> = ({
  children,
  getLogger,
}) => {
  const { action, dispatch } = useStore();
  const logger = getLogger || getConsoleLogger;
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

  const _onWindowPopState = useCallback(function () {
    if (process.env.NODE_ENV === "development") {
      (logger(LoggerType.OnPopState) as OnPopStateLogger).logOnPopState(
        ...arguments,
      );
    }
  }, []);

  // For debugging purposes
  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const listenTo = ["pushState", "replaceState"];
    const { history } = window;
    // replaces default APIs with function that also logs the arguments
    listenTo.forEach((key) => {
      const original = history[key as never] as () => void;
      (history[key as never] as () => void) = function () {
        original.apply(history, arguments as never);
        if (process.env.NODE_ENV === "development") {
          if (key === "pushState") {
            (logger(LoggerType.PushState) as PushStateLogger).logPushState(
              key,
              ...arguments,
            );
          } else if (key === "replaceState") {
            (
              logger(LoggerType.ReplaceState) as ReplaceStateLogger
            ).logReplaceState(key, ...arguments);
          }
        }
      };
    });

    // add a listener to the popstate event for debugging purposes
    window.addEventListener("popstate", _onWindowPopState);

    return () => {
      window.removeEventListener("popstate", _onWindowPopState);
    };
  }, []);

  const ctxValue = useMemo(
    () => ({
      reset,
      push,
      replace,
      pop,
      getLogger: logger,
    }),
    [reset, push, replace, pop, logger],
  );

  return (
    <GlobalStateRouterContext.Provider value={ctxValue}>
      {children}
    </GlobalStateRouterContext.Provider>
  );
};
