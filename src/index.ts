import CssManager from "./style/CssManager";
import { makeCommandElements } from "./element";
import { doWeExist, getNpmCommandEl } from "./util";

const addElements = () => requestAnimationFrame(() => {
    getNpmCommandEl().after(...makeCommandElements())
});
// index
setTimeout(() => {
    addElements();
    CssManager.init();
    setInterval(() => {
        if(doWeExist()) return;
        else addElements();
    }, 500)
}, 100);
