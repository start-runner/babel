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

                log(file.path);

                return {
                    path: file.path,
                    data: result.code,
                    map: result.map
                };
            });

            resolve(files);
        });
    };
};
