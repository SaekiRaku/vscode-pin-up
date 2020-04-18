const vscode = require('vscode');
const { executeCommand } = vscode.commands
const PinDataProvider = require("./PinDataProvider");

var app = require("./app.js");

module.exports = function (context) {
    app.pindata = new PinDataProvider();

    let viewActivitybarTree = vscode.window.createTreeView("view-activitybar", {
        treeDataProvider: app.pindata
    });

    let viewExplorerTree = vscode.window.createTreeView("view-explorer", {
        treeDataProvider: app.pindata
    });

    function onSelect(evt) {
        if (evt.selection[0].collapsibleState == vscode.TreeItemCollapsibleState.None) {
            executeCommand("vscode.open", evt.selection[0].resourceUri);
        }
    }
    

    viewActivitybarTree.onDidChangeSelection(onSelect);
    viewExplorerTree.onDidChangeSelection(onSelect);
}