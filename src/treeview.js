const vscode = require('vscode');
const PinDataProvider = require("./PinDataProvider");

var share = require("./share.js");

module.exports = function (context) {
    share.pindata = new PinDataProvider();

    // let config = vscode.workspace.getConfiguration('pin-up');

    const viewActivitybarTree = vscode.window.createTreeView("view-activitybar", {
        showCollapseAll: true,
        treeDataProvider: share.pindata
    });

    const viewExplorerTree = vscode.window.createTreeView("view-explorer", {
        showCollapseAll: true,
        treeDataProvider: share.pindata
    });

    // viewActivitybarTree.title = config.ui.emoji ? "📌 Pinned Files" : "Pinned Files";
    // viewExplorerTree.title = config.ui.emoji ? "📌 Pinned Files" : "Pinned Files";
}