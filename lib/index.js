const defaultOptions = {
    ast: false
};

export default (userOptions) => (input) => {
    return function babel(log) {
        const babelTransform = require('babel-core').babelTransform;

        return new Promise((resolve, reject) => {
            const files = input.map(file => {
                const options = {
                    ...defaultOptions,
                    inputSourceMap: file.map,
                    ...userOptions,
                    filename: file.path
                };

                let result;

                try {
                    result = babelTransform(file.data, options);

                    return {
                        path: file.path,
                        data: result.code,
                        map: result.map
                    };
                } catch (err) {
                    reject(err);
                }
            });

            resolve(files);
        });
    };
};
