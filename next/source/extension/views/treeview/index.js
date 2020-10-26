import vscode from "vscode";
import treeviewDataProvider from "./treeviewDataProvider.js";

export var dataProvider = new treeviewDataProvider();

export default function() {
    const ActivitybarTreeview = vscode.window.createTreeView("view-activitybar", {
        showCollapseAll: true,
        treeDataProvider: dataProvider
    });

    const ExplorerTreeview = vscode.window.createTreeView("view-explorer", {
        showCollapseAll: true,
        treeDataProvider: dataProvider
    });
}