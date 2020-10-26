import os from "os";

function fixedPath(thepath) {
    if (os.type() == "Windows_NT") {
        if (thepath[0] === "/") {
            return thepath.slice(1, thepath.length);
        }
    }
    return thepath;
}


export default {
    context: null,
    fixedPath
}