const os = require("os");
const vscode = require('vscode');
const i18n = require("./i18n.runtime.js");

exports.fixedPath = function (thepath) {
    if (os.type() == "Windows_NT") {
        if (thepath[0] === "/") {
            return thepath.slice(1, thepath.length);
        }
    }
    return thepath;
}

exports.uiConfirm = async function (title) {
    let YES = i18n("yes");
    let NO = i18n("no");
    let quickpick = vscode.window.createQuickPick();
    quickpick.title = title;
    quickpick.items = [{
        label: YES
    }, {
        label: NO
    }];

    quickpick.show();

    let pick = await new Promise((resolve, reject) => {
        let select = "";

        quickpick.onDidChangeSelection((evt) => {
            select = evt[0].label;
        });

        quickpick.onDidAccept((evt) => {
            quickpick.hide();
            resolve(select);
        })
    })

    quickpick.dispose();

    if (!pick || pick === NO) {
        return false;
    }
    return true;
}