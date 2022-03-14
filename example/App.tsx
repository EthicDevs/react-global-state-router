import React, { VFC } from "react";
import {
  GlobalStateProvider,
  combineModules,
} from "@ethicdevs/react-global-state-hooks";

import { GlobalStateRouterProvider, Link, Router, Route } from "./components";
import { GlobalStateRouterStateModule } from "./state";

const OnboardingScreen: VFC = () => {
  return (
    <div>
      <h1>Hey, welcome!</h1>
      <h2>react-globa-state-router is a tiny router for the braves!</h2>
      <Link screen={"JoinScreen"}>Get started!</Link>
    </div>
  );
};

const JoinScreen: VFC = () => {
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

const RegisterScreen: VFC = () => {
  return (
    <div>
      <h1>Register</h1>
      <Link screen={"OnboardingScreen"} replace>
        Back to Onboarding
      </Link>
    </div>
  );
};

const LoginScreen: VFC = () => {
  return (
    <div>
      <h1>Login</h1>
      <Link screen={"OnboardingScreen"} replace>
        Back to Onboarding
      </Link>
    </div>
  );
};

function App() {
  return (
    <Router initialScreen={"OnboardingScreen"}>
      <Route screen={"OnboardingScreen"} component={<OnboardingScreen />} />
      <Route screen={"JoinScreen"} component={<JoinScreen />} />
      <Route screen={"LoginScreen"} component={<LoginScreen />} />
      <Route screen={"RegisterScreen"} component={<RegisterScreen />} />
    </Router>
  );
}

const { initialState, rootReducer } = combineModules({
  ...GlobalStateRouterStateModule,
});

const AppWithProviders: VFC = () => {
  return (
    <GlobalStateProvider initialState={initialState} rootReducer={rootReducer}>
      <GlobalStateRouterProvider>
        <App />
      </GlobalStateRouterProvider>
    </GlobalStateProvider>
  );
};

export default AppWithProviders;
