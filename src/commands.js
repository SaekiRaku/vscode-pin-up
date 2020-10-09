const fs = require("fs");
const path = require("path");
const vscode = require('vscode');
const { registerCommand, executeCommand } = vscode.commands;
const utils = require("./utils.js");
const i18n = require("./i18n.runtime.js");

var share = require("./share.js");

module.exports = function (context) {

    context.subscriptions.push(registerCommand('pin-up.add-pin', function (file) {
        share.pindata.AddPin(utils.fixedPath(file.path));
    }));

    context.subscriptions.push(registerCommand('pin-up.add-pin-current', function () {
        
        // share.pindata.AddPin(utils.fixedPath(file.path));
    }));

    context.subscriptions.push(registerCommand('pin-up.add-pin-outside', async function () {
        let files = await vscode.window.showOpenDialog({
            canSelectFiles: true,
            canSelectFolders: true,
            canSelectMany: true,
            openLabel: "📌 Pin Up"
        })

        files.length && files.forEach(uri => {
            share.pindata.AddPin(utils.fixedPath(uri.path));
        })
    }));

    context.subscriptions.push(registerCommand('pin-up.remove-pin', async function (element) {
        let config = vscode.workspace.getConfiguration('pin-up');
        if (config.confirm.removePin) {
            const yes = i18n("yes");
            const no = i18n("no");
            let confirm = await vscode.window.showWarningMessage(i18n("confirm-to-remove-pin"), { modal: true }, yes, no);
            if (confirm === no) {
                return;
            }
        }
        share.pindata.RemovePin(element);
    }));

    context.subscriptions.push(registerCommand('pin-up.clear-pin', async function () {
        let config = vscode.workspace.getConfiguration('pin-up');
        if (config.confirm.removePin) {
            const yes = i18n("yes");
            const no = i18n("no");
            let confirm = await vscode.window.showWarningMessage(i18n("confirm-to-clear-pin"), { modal: true }, yes, no);
            if (confirm === no) {
                return;
            }
        }
        share.pindata.ClearPin();
    }));

    context.subscriptions.push(registerCommand('pin-up.alias-pin', async function (element) {
        let input = await vscode.window.showInputBox({
            "placeHolder": i18n("input-alias"),
            "value": path.basename(path.dirname(element.uri.path))
        });

        share.pindata.AliasPin(element, input);
    }));

    /******* Files Operation *******/
    
    context.subscriptions.push(registerCommand('pin-up.fs-create-file', async function (element) {
        let input = await vscode.window.showInputBox({
            "placeHolder": i18n("input-file-name")
        })

        if (!input) {
            return;
        }

        let basepath = utils.fixedPath(element.uri.path);
        let finalpath;
        if (fs.statSync(basepath).isDirectory()) {
            finalpath = path.resolve(basepath, input);
        } else {
            finalpath = path.resolve(path.dirname(basepath), input);
        }

        if (fs.existsSync(finalpath)) {
            let overwrite = await utils.uiConfirm(i18n("file-exists"));
            if (!overwrite) {
                return;
            }
        }

        fs.writeFileSync(finalpath, "");
        share.pindata.refresh();
    }));

    context.subscriptions.push(registerCommand('pin-up.fs-create-folder', async function (element) {
        let input = await vscode.window.showInputBox({
            "placeHolder": i18n("input-folder-name")
        })

        if (!input) {
            return;
        }

        let basepath = utils.fixedPath(element.uri.path);
        let finalpath;
        if (fs.statSync(basepath).isDirectory()) {
            finalpath = path.resolve(basepath, input);
        } else {
            finalpath = path.resolve(path.dirname(basepath), input);
        }

        if (fs.existsSync(finalpath)) {
            let overwrite = await utils.uiConfirm(i18n("file-exists"));
            if (!overwrite) {
                return;
            }
        }

        fs.mkdirSync(finalpath, { recursive: true });
        share.pindata.refresh();
    }));

    context.subscriptions.push(registerCommand('pin-up.fs-delete', async function (element) {
        let filepath = utils.fixedPath(element.uri.path);
        if (share.pindata.HavePin(filepath)) {
            share.pindata.RemovePin(element)
        }
        vscode.workspace.fs.delete(element.uri, { recursive: true, useTrash: true });
        share.pindata.refresh();
    }));

    /******* Common Commands *******/
        
    context.subscriptions.push(registerCommand('pin-up.open-resource-uri', function (resourceUri) {
        vscode.window.showTextDocument(resourceUri).catch(() => {
            executeCommand("vscode.open", resourceUri);
        });
    }));
}
