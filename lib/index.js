const defaultOptions = {
    ast: false
};

export default (userOptions) => (input) => {
    return function babel(log) {
        const path = require('path');
        const babelTransform = require('babel-core').transform;

        return new Promise(resolve => {
            const files = input.map(file => {
                const options = {
                    ...defaultOptions,
                    inputSourceMap: file.map,
                    ...userOptions,
                    filename: file.path
                };

                const result = babelTransform(file.data, options);
                let data = result.code;

                // add source map comment
                if (result.map !== null) {
                    data += '\n//# sourceMappingURL=' + path.basename(file.path) + '.map';
                }

                return {
                    path: file.path,
                    data,
                    map: result.map
                };
            });

            resolve(files);
        });
    };
};
