import path from "path";

const ROOT = path.resolve(__dirname, "..")

const envpath = {
    root: ROOT,
    source: path.resolve(ROOT, "next/source"),
    dist: path.resolve(ROOT, "next/dist"),
    release: path.resolve(ROOT, "next/release")
}

export default {
    path: envpath
}