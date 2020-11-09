/**
 * Resolve config files.
 */

import fs from "fs";
import path from "path";
import vscode from "vscode";

import common from "pinup/common";

var  config = {
    workspaceConfigPath: undefined,
    globalConfigPath: undefined,
    available: true,
    raw: null,

    save
}

export default config;

export function init() {
    config.workspaceConfig = path.resolve(common.context.storagePath, "pin-up-config.json");
    config.globalConfigPath = path.resolve(common.context.globalStoragePath, "pin-up-config.json");

    var workspaces = vscode.workspace.workspaceFolders;
    if (!workspaces) {
        vscode.window.showWarningMessage("You have to use the Pin Up extension in a workspace.")
        config.available = false;
        // return;
    } else {
        config.raw = loadAndConvertConfig(config.workspaceConfigPath);
        config.raw.global = loadAndConvertConfig(config.globalConfigPath);
        save();
    }
}

/**
 * Load config file and convert old format to the latest.
 */
export function loadAndConvertConfig(configPath) {
    let resultConfig = {};

    let oldConfigPath = vscode.workspace.rootPath ? path.resolve(vscode.workspace.rootPath, ".vscode", "pinned-files.json") : undefined;
    // The old config is stored in the `.vscode` directory of the workspace.
    // If openned multiple workspace, VSCode will use first workspace directory as the rootPath

    if (oldConfigPath && fs.existsSync(oldConfigPath)) {
        // Convert V1 or V2 format
        let oldConfig = fs.readFileSync(oldConfigPath).toString();
        try {
            oldConfig = JSON.parse(oldConfig);
        } catch (e) {
            // TODO: Tell user that old config was deprecated due to failed to parse JSON.
        }

        // Convert V1
        if (Array.isArray(oldConfig)) {
            resultConfig = {
                "version": "2",
                "pinnedList": JSON.parse(JSON.stringify(oldConfig)),
                "aliasMap": {}
            }
        }

        // Convert V2
        if (resultConfig.version == "2") {
            resultConfig.version = "3";
            fs.unlinkSync(oldConfigPath);
            if (!fs.readdirSync(path.dirname(oldConfigPath)).length) {
                fs.rmdirSync(path.dirname(oldConfigPath));
            }
        }
    } else {
        try {
            resultConfig = JSON.parse(fs.readFileSync(configPath).toString());
        } catch (e) {
            // TODO: Tell user that old config was deprecated due to failed to parse JSON.
        }
    }

    // Convert V3 (Not need)
    if (resultConfig.version == 3) {}

    return resultConfig;
}

export function save() {
    let workspaceConfig = JSON.parse(JSON.stringify(config.raw));
    delete workspaceConfig.global;
    fs.writeFileSync(config.workspaceConfigPath, JSON.stringify(workspaceConfig));
    fs.writeFileSync(config.globalConfigPath, JSON.stringify(config.raw.global));
}