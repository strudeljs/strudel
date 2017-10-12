# Strudel.js Contributing Guide

It's great that you would like to contribute to the Strudel.js development. Please take a moment and read following guidelines.  

## Issue Reporting Guidelines

- Always use [https://github.com/strudeljs/strudel/issues](https://github.com/strudeljs/strudel/issues) to create new issues.

## Pull request guidelines

- All pull requests should be submitted against `dev` branch

- There is no need for squashing commits as Github will take care of that before merging

- Make sure `npm test` passes

- If adding new feature/fixing bug
  - Add/fix accompanying test case
  - Provide description/reason of the bug/new feature

## Development Setup

You will need [Node.js](http://nodejs.org) **version 6+** and [Java Runtime Environment](http://www.oracle.com/technetwork/java/javase/downloads/index.html) (needed for running Selenium server during e2e tests).

After cloning the repo, please run:

``` bash
$ npm install
$ npm run setup
```


### Useful NPM scripts

``` bash
# build all dist files
$ npm run build

# run the full test suite
$ npm test
```

## Credits

Thank you to all the people who have already contributed to strudeljs!
