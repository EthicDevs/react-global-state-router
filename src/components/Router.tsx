import React, { FC, useCallback, useEffect } from "react";

import { extractScreenFromPathname } from "../helpers";
import { useRouter } from "../hooks";

type RouterProps = {
  initialScreen: string;
  initialScreenArgs?: unknown[];
};

export const Router: FC<RouterProps> = ({
  children,
  initialScreen,
  initialScreenArgs,
}) => {
  const { push, pop, replace } = useRouter({
    initialScreen,
    initialScreenArgs,
  });

  const onPopState = useCallback(
    (event: PopStateEvent) => {
      const { screen, args } = event.state;
      if (event.state?.t === "push") {
        push(screen, args);
      } else if (event.state?.t === "replace") {
        replace(screen, args);
      } else {
        pop();
      }
    },
    [push, replace, pop],
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }
    window.addEventListener("popstate", onPopState);

    // In case onPopState changed or hook re-rendered
    if (history.state != null) {
      onPopState({ state: history.state } as never);
    }

    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, [onPopState]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const { pathname } = window.location;
    console.log("pathname:", pathname, window.location);

    if (pathname.startsWith("/http://")) {
      return undefined;
    }

    const screen = extractScreenFromPathname(pathname, initialScreen);
    if (screen != null) {
      // TODO: also check that screen is registered within the router first!
      console.log("screen:", screen);
      replace(screen);
    } else {
      // Show 404?
    }

    return () => {};
  }, []); // needs to stay empty to run only on mount/unmount.

  return <>{children}</>;
};
