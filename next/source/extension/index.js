import common from "pinup/common";
import { init as initConfig } from "pinup/config";
import initViews from "pinup/views";

export function activate(context) {
    common.context = context;

    initConfig()
    initViews();
}

export function deactivate() {

}