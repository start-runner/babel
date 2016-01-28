export default function(patterns, outRootDir, options = {}) {
    return function babelBuild(resolve, reject) {
        process.env.NODE_ENV = 'production';

        const path = require('path');
        const globby = require('globby');
        const pify = require('pify');
        const makeDir = pify(require('mkdirp'));
        const transformFile = pify(require('babel-core').transformFile);
        const writeFile = pify(require('fs').writeFile);

        globby(patterns, { realpath: true }).then(function(files) {
            return Promise.all(
                files.map(function(inFile) {
                    // /root/src/beep/index.js -> src/beep/index.js
                    const relativeInDir = path.relative(process.cwd(), inFile);
                    // src/beep/index.js -> beep/index.js
                    const relativeInFile = relativeInDir.split(path.sep).slice(1).join(path.sep);
                    // beep/index.js -> build/beep/index.js
                    const outFile = path.resolve(outRootDir, relativeInFile);
                    // build/beep/index.js -> build/beep
                    const outDir = path.dirname(outFile);

                    return makeDir(outDir)
                        .then(function() {
                            return transformFile(inFile, options);
                        })
                        .then(function(result) {
                            return writeFile(outFile, result.code, 'utf-8');
                        })
                        .then(function() {
                            return outFile;
                        });
                })
            );
        })
        .then(resolve)
        .catch(reject);
    };
}
