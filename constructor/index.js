import manifest from "./build-manifest.js";
import extension from "./build-extension.js";

const IS_PRODUCTION = (process.env.NODE_ENV === "production");

if (IS_PRODUCTION) {
    manifest.build();
    extension.build();
} else {
    manifest.watch();
    extension.watch();
}