import { actionType } from "@ethicdevs/react-global-state-hooks";

// Module key.
export const modKey = "router";

// Types of actions for this module
export const ActionTypes = Object.freeze({
  RESET: actionType("RESET", modKey),
  PUSH: actionType("PUSH", modKey),
  REPLACE: actionType("REPLACE", modKey),
  POP: actionType("POP", modKey),
});

export type ActionType = keyof typeof ActionTypes;
