import common from "pinup/common";

// const initCommands = require("./commands.js");
// const initTreeview = require("./treeview.js");

export function activate(context) {
    common.context = context;
    // initTreeview(context);
    // initCommands(context);
}

export function deactivate() {
    
}