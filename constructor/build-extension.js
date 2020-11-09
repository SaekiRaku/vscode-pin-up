import path from "path";

import * as rollup from "rollup";
import alias from "@rollup/plugin-alias";
import nodeResolve from "@rollup/plugin-node-resolve";

import env from "./env";

const inputOptions = {
    input: path.resolve(env.path.source, "extension/index.js"),
    external: ["vscode", "fs", "path"],
    plugins: [
        alias({
            entries: [
                { find: "pinup", replacement: path.resolve(env.path.source, "extension") }
            ],
            customResolver: nodeResolve({ extensions: ['.js', '.json'] })
        }),
        nodeResolve({ extensions: ['.js', '.json'] })
    ]
}

const outputOptions = {
    file: path.resolve(env.path.dist, "index.js"),
    sourcemap: true,
    format: "cjs"
}

async function build() {
    const bundle = await rollup.rollup(inputOptions);
    await bundle.write(outputOptions);
}

function watch() {
    const watchOptions = Object.assign({}, inputOptions, {output:outputOptions})
    const watcher = rollup.watch(watchOptions);

    watcher.on("event", event => {
        switch (event.code) {
            case "ERROR":
                console.error(event.error);
                break;
        }
    })
}

export default {
    build,
    watch
}