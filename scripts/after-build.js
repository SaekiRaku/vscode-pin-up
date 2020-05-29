import fs from "fs";
import path from "path";
import {
    sync as glob
} from "glob";
import zip from "@tybys/cross-zip";

const PATH_ROOT = path.resolve(__dirname, "../");
const PATH_TEMP = path.resolve(__dirname, "../temp");

let files = glob("*.vsix", {
    cwd: PATH_ROOT,
    absolute: true
})

let latestFile = null;
let latestTime = 0;

files.forEach((filepath) => {
    let {
        birthtimeMs
    } = fs.statSync(filepath)
    if (birthtimeMs > latestTime) {
        if (latestFile) {
            fs.unlinkSync(latestFile);
        }
        latestFile = filepath;
        latestTime = birthtimeMs;
    }
})

if (fs.existsSync(PATH_TEMP)) {
    fs.rmdirSync(PATH_TEMP, {
        recursive: true
    });
}
fs.mkdirSync(PATH_TEMP, {
    recursive: true
});
zip.unzipSync(latestFile, PATH_TEMP);

let i18ns = glob("*.json", {
    cwd: path.resolve(PATH_ROOT, "i18n"),
    absolute: true
})

i18ns.forEach(filepath => {
    fs.copyFileSync(filepath, path.resolve(PATH_TEMP, "extension", path.basename(filepath)));
})

fs.unlinkSync(latestFile);
zip.zipSync(PATH_TEMP, latestFile);

fs.rmdirSync(PATH_TEMP, { recursive: true });