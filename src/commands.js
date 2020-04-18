const vscode = require('vscode');
const { registerCommand, executeCommand } = vscode.commands;

var app = require("./app.js");

module.exports = function (context) {

    executeCommand("setContext", "pin-up.list-view", "level")

    let AddPin = registerCommand('pin-up.add-pin', function (file) {
        app.pindata.AddPin(file);
    });

    let RemovePin = registerCommand('pin-up.remove-pin', function (file) {
        app.pindata.RemovePin(file);
    });

    let ClearPin = registerCommand('pin-up.clear-pin', function () {
        app.pindata.ClearPin();
    });

    context.subscriptions.push(AddPin);
    context.subscriptions.push(RemovePin);
    context.subscriptions.push(ClearPin);
}
