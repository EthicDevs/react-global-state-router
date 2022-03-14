import { VFC } from "react";
import { Link } from "@ethicdevs/react-global-state-router";

export const OnboardingScreen: VFC = () => {
  return (
    <div>
      <h1>Hey, welcome!</h1>
      <h2>react-global-state-router is a tiny router for the braves!</h2>
      <Link screen={"JoinScreen"}>Get started!</Link>
    </div>
  );
};
