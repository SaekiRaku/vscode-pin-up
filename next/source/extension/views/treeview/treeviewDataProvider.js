import fs from "fs";
import path from "path";
import vscode from "vscode";

import config from "pinup/config";

class PinnedItem {
    constructor(uri, type, isRoot = false) {
        this.uri = uri;
        this.type = type;
        this.isRoot = isRoot;
    }
}

export default class TreeviewDataProvider {
    _onDidChangeTreeData = new vscode.EventEmitter();
    onDidChangeTreeData = this._onDidChangeTreeData.event;

    ignoreList = [];

    constructor() {
        let extensionConfig = vscode.workspace.getConfiguration('pin-up');
        this.ignoreList = extensionConfig.list.ignore;

        vscode.workspace.onDidChangeConfiguration(() => {
            let extensionConfig = vscode.workspace.getConfiguration('pin-up');
            this.ignoreList = extensionConfig.list.ignore;
            this.refresh();
        });

        this.refresh();
    }

    getChildren(element) {
        if (!element) {
            return config.raw.pinnedList.map(filepath => {
                filepath = common.fixedPath(filepath);
                let isDir = fs.statSync(filepath).isDirectory();
                let uri = vscode.Uri.file(filepath);
                return new PinnedItem(uri, isDir ? vscode.FileType.Directory : vscode.FileType.File, true);
            });
        } else {
            let dirs = fs.readdirSync(utils.fixedPath(element.uri.path), { withFileTypes: true });
            dirs.sort((a, b) => {
                if (a.isDirectory() && !b.isDirectory()) {
                    return -1;
                } else if (!a.isDirectory() && b.isDirectory()) {
                    return 1;
                }
                return 0;
            })

            let childrens = [];

            dirs.forEach(fileItem => {
                let filepath = path.resolve(utils.fixedPath(element.uri.path), fileItem.name)
                let isDir = fileItem.isDirectory();
                if (isDir) {
                    filepath += "/";
                }

                for (let i in this._ignoreList) {
                    let regexp = new RegExp(this._ignoreList[i]);
                    console.log(filepath, regexp.test(filepath), this._ignoreList[i]);
                    if (regexp.test(filepath)) {
                        return;
                    }
                }

                childrens.push(new PinnedItem(
                    vscode.Uri.file(filepath),
                    isDir ? vscode.FileType.Directory : vscode.FileType.File
                ));
            });

            return childrens;
        }
    }

    refresh() {
        
    }

}