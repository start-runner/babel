[![npm](https://img.shields.io/npm/v/start-babel.svg?style=flat-square)](https://www.npmjs.com/package/start-babel)
[![travis](http://img.shields.io/travis/start-runner/babel.svg?style=flat-square)](https://travis-ci.org/start-runner/babel)
[![coverage](https://img.shields.io/codecov/c/github/start-runner/babel.svg?style=flat-square)](https://codecov.io/github/start-runner/babel)
[![deps](https://img.shields.io/gemnasium/start-runner/babel.svg?style=flat-square)](https://gemnasium.com/start-runner/babel)
[![gitter](https://img.shields.io/badge/gitter-join_chat_%E2%86%92-00d06f.svg?style=flat-square)](https://gitter.im/start-runner/start)

[Babel](https://babeljs.io/) task for [Start](https://github.com/start-runner/start).

## Install

```
npm i -S start-babel
```

## Usage

```js
import start from 'start';
import logger from 'start-simple-logger';
import files from 'start-files';
import watch from 'start-watch';
import clean from 'start-clean';
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

export function dev() {
    return start(
        files('build/'),
        clean(),
        files('lib/**/*.js'),
        watch(file => start(
            files(file),
            babel(),
            write('build/')
        ))
    );
}
```

Task is rely on array of files and provides `[{ path, data }]` output, see [documentation](https://github.com/start-runner/start#readme) for details.

## Arguments

`babel(options)`

* `options` – [Babel options](https://babeljs.io/docs/usage/options/), `{ ast: false }` by default
