[![npm](https://img.shields.io/npm/v/start-babel.svg?style=flat-square)](https://www.npmjs.com/package/start-babel)
[![travis](http://img.shields.io/travis/start-runner/babel.svg?style=flat-square)](https://travis-ci.org/start-runner/babel)
[![deps](https://img.shields.io/gemnasium/start-runner/babel.svg?style=flat-square)](https://gemnasium.com/start-runner/babel)

Babel task for [Start](https://github.com/start-runner/start).

## Install

```
npm i -S start-babel
```

## Usage

Task is rely on array of files and provides `[{ path, data }]` output.

```js
// tasks/index.js
import start from 'start';
import logger from 'start-simple-logger';
import clean from 'start-clean';
import files from 'start-files';
import babel from 'start-babel';
import write from 'start-write';

export function build() {
    return start(logger())(
        files('build/'),
        clean(),
        files('lib/**/*.js'),
        babel(),
        write('build/')
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

`babel(options)`

* `options` – [Babel options](https://babeljs.io/docs/usage/options/), `{ ast: false }` by default
