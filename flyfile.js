/**
 * @Fly.js - https://github.com/flyjs/fly (Modern build system that leverages co-routines, generators and promises)
 * */

const scripts = {
    path: "lib/**/*.js",
    esnext: "lib/**/*.esnext.js"
};


export default function* () {
    yield this.clear("bin");
    yield this.watch(scripts.path, ['build'])
}

export function* build() {
    yield this.clear("bin");
    yield this.source(scripts.path).babel().target("bin");
    yield this.source(scripts.esnext).target("bin");
}