export function extractScreenFromPathname(
  pathname?: string | null,
  initialScreen: string = "InitialScreen",
  screenSuffix: string = "Screen",
): null | string {
  // quick short circuit if not string
  if (pathname == null || (pathname != null && typeof pathname !== "string")) {
    return null;
  }

  // special case for / path when we are given an initialScreen
  if (pathname.trim() === "/" && initialScreen != null) {
    return initialScreen;
  }

  const parts = pathname.split("/").filter((x) => x != null && x !== "/");
  const screenBase = String(parts[0]?.trim() !== "" ? parts[0] : parts[1]);
  const capitalFirstLetter = screenBase[0].toUpperCase();
  const lowercaseRest = screenBase.substring(1).replace(/screen$/, "");

  return `${capitalFirstLetter}${lowercaseRest}${screenSuffix}`;
}
