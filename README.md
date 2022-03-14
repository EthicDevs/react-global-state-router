# `react-global-state-router`

[![NPM](https://img.shields.io/npm/v/@ethicdevs/react-global-state-router?color=red&v2=1)](https://www.npmjs.com/package/@ethicdevs/react-global-state-router)
[![MIT License](https://img.shields.io/github/license/ethicdevs/react-global-state-router.svg?color=blue)](https://github.com/ethicdevs/react-global-state-router/blob/master/LICENSE)

## Installation

```shell
$ yarn add @ethicdevs/react-global-state-router
# or
$ npm i @ethicdevs/react-global-state-router
```

---

See this CodeSandBox for a [live editable demo](https://codesandbox.io/s/react-global-state-router-example-iehfz8?file=/src/App.tsx).
Or just run `cd example && yarn && yarn start` if you have cloned the repo already.

---

## Usage

Add the `GlobalStateRouterProvider` just under your `GlobalStateProvider` so that router/routes/links can use its context.

note: If you do not have a `GlobalStateProvider` already, please head over to the [@ethicdevs/react-global-state-hooks](https://github.com/ethicdevs/react-global-state-hooks) repository and follow the README's instructions first. This library builds upon it.

```diff
// src/App.tsx
import React from "react";
import { GlobalStateProvider } from "@ethicdevs/react-global-state-hooks";
+ import { GlobalStateRouterProvider } from "@ethicdevs/react-global-state-router";

import { initialState, rootReducer } from "./state";

const App = () => <>{/* Your app */}</>;

const AppWithProviders = () => (
  <GlobalStateProvider initialState={initialState} rootReducer={rootReducer}>
+    <GlobalStateRouterProvider>
      <App />
+    </GlobalStateRouterProvider>
  </GlobalStateProvider>
);

export default AppWithProviders;
```

Update your `globalState.ts/js` or `state/index.ts/js` file to include the router's exported from this library (so that it can use your store to manage the routing state, giving you full control over routing in your app! 👌) =>

```diff
// src/state/index.ts
import { combineModules } from "@ethicdevs/react-global-state-hooks";
+ import { GlobalStateRouterStateModule } from "@ethicdevs/react-global-state-router"

import { AuthModule } from "./auth";
import { HelloModule } from "./hello";

// Auto export everything needed for the Provider
export const { ActionTypes, rootReducer, initialState } = combineModules({
+  ...GlobalStateRouterStateModule,
  auth: AuthModule,
  hello: HelloModule,
});
```

You are now ready to add your first router and your first routes! Let's see how to simply do that:

```diff
// src/App.tsx
import React, { VFC } from "react";

import { GlobalStateProvider } from "@ethicdevs/react-global-state-hooks";
+ import { GlobalStateRouterProvider, Link, Router, Route } from "@ethicdevs/react-global-state-router";

// ... striped for brevity ...

// Add some screens to showcase the features of Link, mainly

+ const OnboardingScreen: VFC = () => {
+   return (
+     <div>
+       <h1>Hey, welcome!</h1>
+       <h2>react-global-state-router is a tiny router for the braves!</h2>
+      <Link screen={"JoinScreen"}>Get started!</Link>
+    </div>
+  );
+};

+const JoinScreen: VFC = () => {
+  return (
+    <div>
+      <h1>Join the move</h1>
+      <h2>Register an account, or login using your existing account.</h2>
+      <Link goBack>Back (pop)</Link>
+      <Link
+        screen={"LoginScreen"}
+        args={{
+          referralUid: "blabbla-uuid",
+        }}
+      >
+        Login
+      </Link>
+      <Link screen={"RegisterScreen"}>Register an account</Link>
+    </div>
+  );
+};

+const RegisterScreen: VFC = () => {
+  return (
+    <div>
+      <h1>Register</h1>
+      <Link screen={"OnboardingScreen"} replace>
+        Back to Onboarding
+      </Link>
+    </div>
+  );
+};

+ const LoginScreen: VFC = () => {
+   return (
+     <div>
+       <h1>Login</h1>
+       <Link screen={"OnboardingScreen"} replace>
+         Back to Onboarding
+       </Link>
+     </div>
+   );
+ };

// Add the router and the routes :)

function App() {
+  return (
+    <Router initialScreen={"OnboardingScreen"}>
+      <Route screen={"OnboardingScreen"} component={<OnboardingScreen />} />
+      <Route screen={"JoinScreen"} component={<JoinScreen />} />
+      <Route screen={"LoginScreen"} component={<LoginScreen />} />
+      <Route screen={"RegisterScreen"} component={<RegisterScreen />} />
+    </Router>
  );
}

```

## License

[MIT](https://github.com/ethicdevs/react-global-state-router/blob/master/LICENSE)
