import { VFC } from "react";
import { Link } from "@ethicdevs/react-global-state-router";

export const RegisterScreen: VFC = () => {
  return (
    <div>
      <h1>Register</h1>
      <Link screen={"OnboardingScreen"} replace>
        Back to Onboarding
      </Link>
    </div>
  );
};
