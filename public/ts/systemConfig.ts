declare module System {
    export function config(any);
}

System.config({
    packages: {
        "js/app": {
            format: "register",
            defaultExtension: "js"
        }
    }
});