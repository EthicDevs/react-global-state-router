import { useContext, useEffect } from "react";
import { GlobalStateRouterContext } from "../context";

export const useRouter = ({
  initialScreen,
}: { initialScreen?: string } = {}) => {
  const ctx = useContext(GlobalStateRouterContext);

  useEffect(() => {
    if (initialScreen != null) {
      ctx.push(initialScreen);
    }
  }, [initialScreen, ctx]);

  return ctx;
};
