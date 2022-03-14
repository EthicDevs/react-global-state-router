import { VFC } from "react";
import { Link } from "@ethicdevs/react-global-state-router";

export const JoinScreen: VFC = () => {
  return (
    <div>
      <h1>Join the move</h1>
      <h2>Register an account, or login using your existing account.</h2>
      <Link goBack>Back (pop)</Link>
      <Link
        screen={"LoginScreen"}
        args={{
          referralUid: "blabbla-uuid",
        }}
      >
        Login
      </Link>
      <Link screen={"RegisterScreen"}>Register an account</Link>
    </div>
  );
};
