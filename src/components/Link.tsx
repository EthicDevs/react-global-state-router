import React, { FC, useMemo } from "react";
import { useSelect } from "@ethicdevs/react-global-state-hooks";

import { extractScreenFromPathname, getScreenPathname } from "../helpers";
import { selectPreviousScreen } from "../state";
import { useRouter } from "../hooks";

type CommonLinkProps = {
  title?: string;
  args?: Record<string, string | number | boolean>;
};

type LinkProps =
  | {
      goBack?: boolean; // x
      screen?: string; // x
      href: string; // !
      replace?: boolean; // optional
    }
  | {
      goBack?: boolean; // x
      screen: string; // !
      href?: string; // x
      replace?: boolean; // optional
    }
  | {
      goBack: true; // !!
      screen?: string; // x
      href?: string; // x
      replace?: false; // optional
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
      _href = getScreenPathname(screen);
      _screen = screen;
    } else if (href != null && screen == null) {
      const pathname = href.startsWith("http") ? new URL(href).pathname : href;
      const _screen = extractScreenFromPathname(pathname) || undefined;
      _href = _screen != null ? getScreenPathname(_screen) : href;
    } else if (goBack === true && prevScreen != null) {
      _href = getScreenPathname(prevScreen[0]);
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
