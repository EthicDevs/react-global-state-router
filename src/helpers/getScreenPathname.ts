export function getScreenPathname(screen: string): string {
  const screenBase = `/${screen.replace(/screen$/i, "").toLocaleLowerCase()}`;
  return screenBase.startsWith("/") ? screenBase : "/" + screenBase;
}
