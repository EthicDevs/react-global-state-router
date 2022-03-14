import React, { VFC, ReactElement } from "react";
import { useSelect } from "@ethicdevs/react-global-state-hooks";

import { selectCurrentScreen } from "../state";

type RouteProps = {
  screen: string;
  component: ReactElement;
};

export const Route: VFC<RouteProps> = ({ screen, component }) => {
  const lastScreen = useSelect(selectCurrentScreen);
  if (
    lastScreen == null ||
    lastScreen[0].trim().toLowerCase() !== screen.trim().toLowerCase()
  ) {
    return null;
  }
  return <>{component}</>;
};
