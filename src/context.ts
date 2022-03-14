import { createContext } from "react";

export interface GlobalStateRouterContextType {
  reset(): void | Promise<void>;
  push(screen: string, ...args: unknown[]): void | Promise<void>;
  replace(screen: string, ...args: unknown[]): void | Promise<void>;
  pop(): void | Promise<void>;
}

const noop = () => undefined;
export const GlobalStateRouterContext =
  createContext<GlobalStateRouterContextType>({
    reset: noop,
    push: noop,
    replace: noop,
    pop: noop,
  });
