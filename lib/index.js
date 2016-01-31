const defaultOptions = {
    ast: false
};

export default (userOptions) => (input) => {
    return function babel(log) {
        const pify = require('pify');
        const transformFile = pify(require('babel-core').transformFile);

        return Promise.all(
            input.map(file => {
                const options = {
                    ...defaultOptions,
                    ...userOptions
                };

                return transformFile(file, options).then(result => {
                    log(file);

                    return {
                        path: file,
                        data: result.code
                    };
                });
            })
        );
    };
};
