import { PNPM_DEV_ELEMENT_ID, PNPM_ELEMENT_ID, YARN_ELEMENT_ID } from "./constants";
import { getNpmCommandEl } from "./util";

/*
 * layout

 * div
    * svg // command icon
    * p
        * code
            * text // changing this
        * button // add event listener and copy
 */
export function makeCommandEl(id: string, command: string) {
    const toRet = getNpmCommandEl().cloneNode(true) as HTMLDivElement;
    toRet.id = id;
    // horrorcode
    const [, { children: [ code, button ] } ]: [never, {children: [HTMLElement, HTMLButtonElement]}] = toRet.children as any;

    code.innerText = code.innerText.replace("npm i", command);

    button.addEventListener("click", copy);
    button.addEventListener("mouseenter", select);
    button.addEventListener("mouseleave", deselect);
    button.addEventListener("blur", deselect);

    return toRet;
}

export function makeCommandElements(): HTMLDivElement[] {
    return [makeCommandEl(PNPM_ELEMENT_ID, "pnpm i"), makeCommandEl(PNPM_DEV_ELEMENT_ID, "pnpm i -D"), makeCommandEl(YARN_ELEMENT_ID, "yarn i")]
}
function copy(ev: MouseEvent) {
    select(ev);
    const success = document.execCommand('copy')
}
function select(ev: MouseEvent) {
    const range = document.createRange()
    // @ts-expect-error just wrong
    range.selectNode(ev.target!.previousElementSibling)
    window.getSelection()?.removeAllRanges()
    window.getSelection()?.addRange(range)
  }
function deselect() {
    window.getSelection()?.removeAllRanges()
}