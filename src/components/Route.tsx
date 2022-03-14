import React, { VFC, ReactElement } from "react";
import { useStore } from "@ethicdevs/react-global-state-hooks";
import { GlobalStateRouterState, modKey } from "../state";

type RouteProps = {
  screen: string;
  component: ReactElement;
};

export const Route: VFC<RouteProps> = ({ screen, component }) => {
  const { state } = useStore<Record<typeof modKey, GlobalStateRouterState>>();

  const lastScreen = state.router.screens[state.router.screens.length - 1];
  if (lastScreen != null && lastScreen[0] === screen) {
    return <>{component}</>;
  }

  return null;
};
