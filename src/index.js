const initCommands = require("./commands.js");
const initTreeview = require("./treeview.js");

function activate(context) {

    initTreeview(context);
    initCommands(context);
    
}
exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
