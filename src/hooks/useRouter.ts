import { useStore } from "@ethicdevs/react-global-state-hooks";
import { useContext, useEffect } from "react";

import { ActionTypes } from "../state";
import { GlobalStateRouterContext } from "../context";

export const useRouter = ({
  initialScreen,
  initialScreenArgs,
}: {
  initialScreen?: string;
  initialScreenArgs?: unknown[];
} = {}) => {
  const { action, dispatch } = useStore();

  useEffect(() => {
    if (initialScreen != null) {
      dispatch(
        action({
          type: ActionTypes.SET_INITIAL_SCREEN,
          payload: {
            initialScreen,
            args: initialScreenArgs,
          },
        }),
      );
    }
  }, [action, dispatch, initialScreen]);

  return useContext(GlobalStateRouterContext);
};
