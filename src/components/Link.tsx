import React, { FC, useMemo } from "react";
import { useSelect } from "@ethicdevs/react-global-state-hooks";

import { selectPreviousScreen } from "../state";
import { useRouter } from "../hooks";

type CommonLinkProps = {
  title?: string;
  args?: Record<string, string | number | boolean>;
};

type LinkProps =
  | {
      goBack?: boolean;
      href: string;
      screen?: string;
      replace?: boolean;
    }
  | {
      goBack?: boolean;
      screen: string;
      href?: string;
      replace?: boolean;
    }
  | {
      goBack: true;
      screen?: string;
      href?: string;
      replace?: false;
    };

export const Link: FC<CommonLinkProps & LinkProps> = ({
  args,
  children,
  goBack,
  href,
  screen,
  title,
  replace,
  ...rest
}) => {
  const router = useRouter();
  const prevScreen = useSelect(selectPreviousScreen);

  const { realHref, realScreen } = useMemo(() => {
    let _href = "",
      _screen = "";

    if (screen != null && href == null) {
      _href = `/${screen.replace(/screen/i, "").toLowerCase()}`;
      _screen = screen;
    } else if (href != null && screen == null) {
      const pathname = (
        href.startsWith("http") ? new URL(href).pathname : href
      ).replace("/", "");

      _screen = pathname;
      _screen = _screen[0].toUpperCase() + _screen.substring(1);
      _href = `/${pathname}`;
    } else if (goBack === true && prevScreen != null) {
      _href = `/${prevScreen[0].replace(/screen/i, "").toLowerCase()}`;
      _screen = prevScreen[0];
    }

    return {
      realHref: _href,
      realScreen: _screen,
    };
  }, [href, goBack, prevScreen, screen]);

  return (
    <a
      {...rest}
      href={realHref}
      title={title}
      onClick={(e) => {
        e.preventDefault();
        if (goBack) {
          router.pop();
        } else if (replace) {
          router.replace(realScreen, args);
        } else {
          router.push(realScreen, args);
        }
      }}
    >
      {children}
    </a>
  );
};
