import React, { FC, useEffect } from "react";

import { useRouter } from "../hooks";

type RouterProps = {
  initialScreen: string;
};

export const Router: FC<RouterProps> = ({ children, initialScreen }) => {
  const { push, pop, replace } = useRouter({ initialScreen });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const onPopState = (event: PopStateEvent) => {
        const { screen, args } = event.state;
        if (event.state?.t === "push") {
          push(screen, args);
        } else if (event.state?.t === "replace") {
          replace(screen, args);
        } else {
          pop();
        }
      };

      window.addEventListener("popstate", onPopState);
      return () => {
        window.removeEventListener("popstate", onPopState);
      };
    }
    return undefined;
  }, []);

  return <>{children}</>;
};
