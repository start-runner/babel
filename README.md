[![npm](https://img.shields.io/npm/v/start-babel.svg?style=flat-square)](https://www.npmjs.com/package/start-eslint)
[![travis](http://img.shields.io/travis/start-runner/babel.svg?style=flat-square)](https://travis-ci.org/start-runner/babel)
[![deps](https://img.shields.io/gemnasium/start-runner/babel.svg?style=flat-square)](https://gemnasium.com/start-runner/babel)

Babel build task for [Start](https://github.com/start-runner/start).

## Install

```
npm i -S start-babel
```

## Usage

```js
// tasks/index.js
import start from 'start';
import logger from 'start-simple-logger';
import babel from 'start-babel';

export function build() {
    return start(logger)(
        ...
        babel('src/**/*.js', 'build/')
        ...
    );
}
```

```js
// package.json
"scripts": {
  "task": "babel-node node_modules/.bin/start tasks/",
  "build": "npm run task build"
}
```

## Arguments

`babel(patterns, outDir, options)`

* `patterns` – [globby patterns](https://github.com/sindresorhus/globby)
* `outDir` – output directory, like `build/`
* `options` – [Babel options](https://babeljs.io/docs/usage/options/)
