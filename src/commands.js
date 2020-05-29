const vscode = require('vscode');
const { registerCommand, executeCommand } = vscode.commands;
const utils = require("./utils.js");

var share = require("./share.js");

module.exports = function (context) {

    context.subscriptions.push(registerCommand('pin-up.add-pin', function (file) {
        share.pindata.AddPin(utils.fixedPath(file.path));
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

    context.subscriptions.push(registerCommand('pin-up.remove-pin', function (element) {
        share.pindata.RemovePin(element);
    }));

    context.subscriptions.push(registerCommand('pin-up.clear-pin', function () {
        share.pindata.ClearPin();
    }));

    /******* Common Commands *******/
        
    context.subscriptions.push(registerCommand('pin-up.open-resource-uri', function (resourceUri) {
        vscode.window.showTextDocument(resourceUri).catch(() => {
            executeCommand("vscode.open", resourceUri);
        });
    }));
}
