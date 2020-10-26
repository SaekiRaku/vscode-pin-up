import common from "pinup/common";
import initViews from "pinup/views";

// const initCommands = require("./commands.js");
// const initTreeview = require("./treeview.js");

export function activate(context) {
    common.context = context;
    
    initViews();
}

export function deactivate() {
    
}