const fs = require("fs")
const path = require("path");
const vscode = require("vscode");
const { executeCommand } = vscode.commands

class PinDataProvider {

    _root = vscode.workspace.rootPath;
    _pinedList = [];

    _onDidChangeTreeData = new vscode.EventEmitter();
    onDidChangeTreeData = this._onDidChangeTreeData.event;

    constructor() {
        let configFilePath = path.resolve(this._root, ".vscode", "pined-files.json");
        if (!fs.existsSync(configFilePath)) {
            return;
        }
        let config = fs.readFileSync(configFilePath).toString();
        try {
            config = JSON.parse(config);
        } catch (e) {
            return;
        }
        for (let i in config) {
            this.AddPin({path:config[i]}, true);
        }
        this.refresh();
    }

    _toVscodeTreeViewChildren(sourceTreeNode) {
        let result = [];
        let children;
        if (sourceTreeNode.children) {
            children = sourceTreeNode.children;
        } else {
            children = sourceTreeNode;
        }
        for (let i in children) {
            result.push(children[i].item);
        }
        return result;
    }

    getChildren(element) {
        if (!element) {
            return this._pinedList;
        } else {
            if (element.collapsibleState == vscode.TreeItemCollapsibleState.None) {
                return element;
            } else {
                let dirs = fs.readdirSync(element.resourceUri.path, { withFileTypes: true });
                let result = [];
                for (let i in dirs) {
                    let item = dirs[i];
                    let isDir = item.isDirectory();
                    result.push(
                        new vscode.TreeItem(
                            vscode.Uri.file(path.resolve(element.resourceUri.path, item.name)),
                            isDir ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None
                        )
                    );
                }
                return result;
            }
        }
    }

    getTreeItem(element) {
        return element;
    }

    refresh() {
        this._onDidChangeTreeData.fire();
        if (this._pinedList.length) {
            executeCommand("setContext", "pin-up-have-pined-files", true);
            if (!fs.existsSync(path.resolve(this._root, ".vscode"))) {
                fs.mkdirSync(path.resolve(this._root, ".vscode"));
            }
            let configFilePath = path.resolve(this._root, ".vscode", "pined-files.json");
            let result = [];
            for (let i in this._pinedList) {
                result.push(this._pinedList[i].resourceUri.path);
            }
            fs.writeFileSync(configFilePath, JSON.stringify(result));
        } else {
            executeCommand("setContext", "pin-up-have-pined-files", false);
        }
    }

    /******* *******/
    
    AddPin(file, nofresh) {

        // 处理原始数据
        if (!file.fsPath) {
            return
        }

        for (let i in this._pinedList) {
            if (this._pinedList[i].resourceUri.path == file.fsPath) {
                return;
            }
        }

        let isDir = fs.statSync(file.fsPath).isDirectory();

        this._pinedList.push(
            new vscode.TreeItem(
                vscode.Uri.file(file.fsPath),
                isDir ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None
            )
        )

        if (!nofresh) {
            this.refresh()
        }
    }

    RemovePin(treeitem) {
        for (let i in this._pinedList) {
            if (treeitem == this._pinedList[i]) {
                this._pinedList.splice(i, 1);
                break;
            }
        }
        this.refresh();
    }

    ClearPin() {
        this._pinedList = [];
        let configFilePath = path.resolve(this._root, ".vscode", "pined-files.json");
        if (fs.existsSync(configFilePath)) {
            fs.unlinkSync(configFilePath);
        }
        this.refresh();
    }
}

module.exports = PinDataProvider;