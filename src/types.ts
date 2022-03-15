export enum LoggerType {
  PushState = "pushState",
  ReplaceState = "replaceState",
  OnPopState = "onpopstate",
}

export interface PushStateLogger {
  logPushState(...args: unknown[]): void;
}
export interface ReplaceStateLogger {
  logReplaceState(...args: unknown[]): void;
}
export interface OnPopStateLogger {
  logOnPopState(...args: unknown[]): void;
}

export type Logger = PushStateLogger | ReplaceStateLogger | OnPopStateLogger;
