# run-then

> 🚲 do something when, a text parser with purpose

[![Npm Version](https://img.shields.io/npm/v/run-then.svg)](https://www.npmjs.com/package/run-then)
[![Build Status](https://travis-ci.org/gabrielcsapo/run-then.svg?branch=master)](https://travis-ci.org/gabrielcsapo/run-then)
[![Coverage Status](https://lcov-server.gabrielcsapo.com/badge/github%2Ecom/gabrielcsapo/run-then.svg)](https://lcov-server.gabrielcsapo.com/coverage/github%2Ecom/gabrielcsapo/run-then)
[![Dependency Status](https://starbuck.gabrielcsapo.com/badge/github/gabrielcsapo/run-then/status.svg)](https://starbuck.gabrielcsapo.com/github/gabrielcsapo/run-then)
[![devDependency Status](https://starbuck.gabrielcsapo.com/badge/github/gabrielcsapo/run-then/dev-status.svg)](https://starbuck.gabrielcsapo.com/github/gabrielcsapo/run-then#info=devDependencies)
[![npm](https://img.shields.io/npm/dt/run-then.svg)]()
[![npm](https://img.shields.io/npm/dm/run-then.svg)]()

## What is this?

Have you ever had a process that takes a long time to finish? Ever want to be alerted or have something happen when that is done? Maybe a long grep or a process that takes awhile to build, but don't have control over the underlying tooling?

```
ls . | grep "foo" | run-then
```

This will check the rules at the following locations:

```
/{homedir}/.runrc
/{cwd}/.runrc
```

## What do the configs look like?

> An example can be found in `/example` with a `README` to show how to run it.

```js
module.exports = {
  default: [{
    when: /^foo bar/,
    do: async function() {
      console.log('hi');
    }
  }],
  verbose: [{
    when: /(.+?)/,
    noOutput: true,
    do: async function(data) {
      console.log(`${Date()} ${data.trim()}`);
    }
  }],
  finished: [{
    onExit: true,
    do: async function(data) {
      console.log('done!');
    }
  }]
}
```

The default command will be executed when run like:

```
ls . | grep "foo" | run-then
```

Rules can be chained or run one at a time like such:

```
ls . | grep "foo" | run-then verbose finished
```
