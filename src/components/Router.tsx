import React, { FC, useCallback, useEffect } from "react";

import { useRouter } from "../hooks";

type RouterProps = {
  initialScreen: string;
};

export const Router: FC<RouterProps> = ({ children, initialScreen }) => {
  const { push, pop, replace } = useRouter({ initialScreen });

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
    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  return <>{children}</>;
};
