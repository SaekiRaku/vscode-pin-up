import path from "path";

import { rollup } from "rollup";
import alias from "@rollup/plugin-alias";
import nodeResolve from "@rollup/plugin-node-resolve";

import env from "./env";

const inputOptions = {
    input: path.resolve(env.path.source, "extension/index.js"),
    plugins: [
        alias({
            entries: [
                { find: "pinup", replacement: path.resolve(env.path.source, "extension") }
            ],
            customResolver: nodeResolve({ extensions: ['.js', '.json'] })
        })
    ]
}

const outputOptions = {
    file: path.resolve(env.path.dist, "index.js"),
    format: "cjs"
}

export default async function build() {
    const IS_PRODUCTION = process.env.NODE_ENV === "production";

    const bundle = await rollup(inputOptions);
    await bundle.write(outputOptions);
}