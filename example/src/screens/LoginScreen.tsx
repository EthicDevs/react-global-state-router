import { Link } from "@ethicdevs/react-global-state-router";
import { VFC } from "react";

export const LoginScreen: VFC = () => {
  return (
    <div>
      <h1>Login</h1>
      <Link screen={"OnboardingScreen"} replace>
        Back to Onboarding
      </Link>
    </div>
  );
};
