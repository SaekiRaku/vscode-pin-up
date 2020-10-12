import fs from "fs";
import path from "path";

import env from "./env.js";

const PATH_ROOT_OF_MANIFEST = path.resolve(env.path.source, "manifest");

fs.readdirSync(PATH_ROOT_OF_MANIFEST);

export default function build(options) {
    
}