import { GlobalStateProvider } from "@ethicdevs/react-global-state-hooks";
import {
  GlobalStateRouterProvider,
  Route,
  Router,
} from "@ethicdevs/react-global-state-router";

import { Dashboard } from "./components/Dashboard";
import {
  OnboardingScreen,
  JoinScreen,
  LoginScreen,
  RegisterScreen,
} from "./screens";

import { initialState, rootReducer } from "./state";

function App() {
  return (
    <>
      <Dashboard />
      <Router
        initialScreen={"OnboardingScreen"}
        initialScreenArgs={[{ foo: "bar" }]}
      >
        <Route screen={"OnboardingScreen"} component={<OnboardingScreen />} />
        <Route screen={"JoinScreen"} component={<JoinScreen />} />
        <Route screen={"LoginScreen"} component={<LoginScreen />} />
        <Route screen={"RegisterScreen"} component={<RegisterScreen />} />
      </Router>
    </>
  );
}

const AppWithProviders = () => (
  <>
    <GlobalStateProvider initialState={initialState} rootReducer={rootReducer}>
      <GlobalStateRouterProvider>
        <App />
      </GlobalStateRouterProvider>
    </GlobalStateProvider>
  </>
);

export default AppWithProviders;
