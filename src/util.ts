import { PNPM_ELEMENT_ID, YARN_ELEMENT_ID } from "./constants";

export function doWeExist(): boolean {
  try {
    const { children } = getSidebarEl();
    return !!(
      children.namedItem(PNPM_ELEMENT_ID) || children.namedItem(YARN_ELEMENT_ID)
    );
  } catch (e) {
    console.warn(e);
  }
  return false;
}
export function getNpmCommandEl(): HTMLDivElement {
    const els = ([...document.querySelectorAll<HTMLDivElement>("div.lh-copy")] as HTMLDivElement[]).filter(({id}) => ![PNPM_ELEMENT_ID, YARN_ELEMENT_ID].includes(id));
  if (els.length !== 1) throw new Error("Command element not found");
  return els[0];
}
export function getSidebarEl(): HTMLElement {
  const e = getNpmCommandEl().parentElement;
  if (e == null) throw new Error("parrent is null");
  return e;
}
