const defaultOptions = {
    ast: false
};

export default (userOptions) => (input) => {
    return function babel(log) {
        const pify = require('pify');
        const babelTransform = pify(require('babel-core').transform);

        return Promise.all(
            input.map(file => {
                const options = {
                    ...defaultOptions,
                    inputSourceMap: file.map,
                    ...userOptions,
                    filename: file
                };

                return babelTransform(file.data, options).then(result => {
                    log(file);

                    return {
                        path: file,
                        data: result.code,
                        map: result.map
                    };
                });
            })
        );
    };
};
