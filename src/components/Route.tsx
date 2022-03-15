import React, { VFC, ReactElement } from "react";
import { useSelect } from "@ethicdevs/react-global-state-hooks";

import { selectCurrentScreen } from "../state";

export type RouteProps = {
  screen: string;
  component: ReactElement;
};

export const Route: VFC<RouteProps> = ({ screen, component }) => {
  const lastScreen = useSelect(selectCurrentScreen);
  const currentScreen = lastScreen?.[0].trim().toLowerCase();
  const normalizedRouteScreen = screen.trim().toLowerCase();

  if (currentScreen !== normalizedRouteScreen) {
    return null;
  }

  return <>{component}</>;
};
