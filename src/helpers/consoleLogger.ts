import {
  Logger,
  LoggerType,
  OnPopStateLogger,
  PushStateLogger,
  ReplaceStateLogger,
} from "../types";

export function getConsoleLogger(loggerType: LoggerType): Logger {
  switch (loggerType) {
    case LoggerType.PushState: {
      return {
        logPushState(...args: unknown[]) {
          console.log(`[router:push] =>`, ...args);
        },
      } as PushStateLogger;
    }
    case LoggerType.ReplaceState: {
      return {
        logReplaceState(...args: unknown[]) {
          console.log(`[router:replace] =>`, ...args);
        },
      } as ReplaceStateLogger;
    }
    case LoggerType.OnPopState: {
      return {
        logOnPopState(...args: unknown[]) {
          console.log(`[router:onPop] =>`, ...args);
        },
      } as OnPopStateLogger;
    }
  }
}
