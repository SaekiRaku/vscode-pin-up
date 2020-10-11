import path from "path";

import { rollup } from "rollup";

const PATH_ROOT = path.resolve(__dirname, "..");
const PATH_SOURCE = path.resolve(PATH_ROOT, "next/source");
const PATH_DIST = path.resolve(PATH_ROOT, "next/dist");

const inputOptions = {
    input: path.resolve(PATH_SOURCE, "index.js"),
}

const outputOptions = {
    file: path.resolve(PATH_DIST, "index.js"),
    format: "cjs"
}

async function build() {
    const bundle = await rollup(inputOptions);
    await bundle.write(outputOptions);
}

build();