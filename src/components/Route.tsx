import React, { VFC, ReactElement } from "react";
import { useSelect } from "@ethicdevs/react-global-state-hooks";

import { selectCurrentScreen } from "../state";

export type RouteProps = {
  screen: string;
  component: ReactElement;
};

export const Route: VFC<RouteProps> = ({ screen, component }) => {
  const lastScreen = useSelect(selectCurrentScreen);

  console.log("lastScreen", lastScreen, screen);

  if (lastScreen?.[0].trim().toLowerCase() !== screen.trim().toLowerCase()) {
    return null;
  }

  return <>{component}</>;
};
