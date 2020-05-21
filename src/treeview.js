const vscode = require('vscode');
const { executeCommand } = vscode.commands
const PinDataProvider = require("./PinDataProvider");

var app = require("./app.js");
const utils = require("./utils.js");

module.exports = function (context) {
    app.pindata = new PinDataProvider();

    let viewActivitybarTree = vscode.window.createTreeView("view-activitybar", {
        treeDataProvider: app.pindata
    });

    let viewExplorerTree = vscode.window.createTreeView("view-explorer", {
        treeDataProvider: app.pindata
    });
}