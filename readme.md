# start-babel

[![npm](https://img.shields.io/npm/v/start-babel.svg?style=flat-square)](https://www.npmjs.com/package/start-babel)
[![linux build](https://img.shields.io/travis/start-runner/babel.svg?label=linux&style=flat-square)](https://travis-ci.org/start-runner/babel)
[![windows build](https://img.shields.io/appveyor/ci/start-runner/babel.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/start-runner/babel)
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
import Start from 'start';
import reporter from 'start-pretty-reporter';
import files from 'start-files';
import watch from 'start-watch';
import clean from 'start-clean';
import read from 'start-read';
import babel from 'start-babel';
import write from 'start-write';

const start = Start(reporter());

export function build() {
    return start(
        files('build/'),
        clean(),
        files('lib/**/*.js'),
        read(),
        babel({ sourceMaps: true }),
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
            read(),
            babel(),
            write('build/')
        ))
    );
}
```

This task relies on `[{ path, data, map }]` input and provides the same, see [documentation](https://github.com/start-runner/start#readme) for details.

## Arguments

`babel(options)`

* `options` – [Babel options](https://babeljs.io/docs/usage/options/), `{ ast: false }` by default
