const vscode = require('vscode');
const PinDataProvider = require("./PinDataProvider");

var share = require("./share.js");

module.exports = function (context) {
    share.pindata = new PinDataProvider();

    const viewActivitybarTree = vscode.window.createTreeView("view-activitybar", {
        treeDataProvider: share.pindata
    });

    const viewExplorerTree = vscode.window.createTreeView("view-explorer", {
        treeDataProvider: share.pindata
    });
}