import { createContext } from "react";

import { getConsoleLogger } from "./helpers";
import { Logger, LoggerType } from "./types";

export interface GlobalStateRouterContextType {
  reset(): void | Promise<void>;
  push(screen: string, ...args: unknown[]): void | Promise<void>;
  replace(screen: string, ...args: unknown[]): void | Promise<void>;
  pop(): void | Promise<void>;
  getLogger(type: LoggerType): Logger;
}

const noop = () => undefined;
export const GlobalStateRouterContext =
  createContext<GlobalStateRouterContextType>({
    reset: noop,
    push: noop,
    replace: noop,
    pop: noop,
    // Default is a simple console logger that can be overridden from the Provider
    getLogger: getConsoleLogger,
  });
