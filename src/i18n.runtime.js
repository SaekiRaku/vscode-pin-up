const translate = {
    "en": {
        "yes": "Yes",
        "no": "No",
        "input-file-name": "Please input file name",
        "input-folder-name": "Please input folder name",
        "input-alias": "Please input alias",
        "file-exists": "Directory/File is already exists, do you want to overwrite it?"
    },
    "zh": {
        "yes": "是",
        "no": "否",
        "input-file-name": "请输入文件名",
        "input-folder-name": "请输入目录名",
        "input-alias": "请输入别名",
        "file-exists": "文件或目录已存在，是否覆盖？"
    }
}

module.exports = function (message) {
    let locale = JSON.parse(process.env.VSCODE_NLS_CONFIG).locale;
    if (locale.indexOf("zh") == 0) {
        locale = "zh"
    }
    let t = translate[locale] || translate["en"];
    return t[message] || message;
}