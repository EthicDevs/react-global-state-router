import React, { FC, useCallback, useEffect } from "react";

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

  return <>{children}</>;
};
