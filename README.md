# Jest spec reporter with CI-friendly output

[![npm version](https://img.shields.io/npm/v/jest-ci-spec-reporter.svg?label=package&logo=npm&style=for-the-badge)](https://www.npmjs.com/package/jest-ci-spec-reporter)
[![build status](https://img.shields.io/github/actions/workflow/status/robertbradleyux/jest-ci-spec-reporter/node.js.yml?logo=github&style=for-the-badge)](https://github.com/robertbradleyux/jest-ci-spec-reporter/actions)
[![size](https://img.shields.io/github/languages/code-size/robertbradleyux/jest-ci-spec-reporter?label=size&style=for-the-badge)](https://github.com/robertbradleyux/jest-ci-spec-reporter)
[![license](https://img.shields.io/github/license/robertbradleyux/jest-ci-spec-reporter?style=for-the-badge)](https://mit-license.org)

A custom reporter for [Jest](https://jestjs.io) which produces a clean and readable output when viewing results in CI build logs.

## Installation

You should install this package as a development dependency:

```bash
npm install --save-dev jest-ci-spec-reporter
```

## Configuration

If you do not have an exiting Jest configuration, create a `jest.config.js` file containing:

```javascript
module.exports = {
  reporters: ["jest-ci-spec-reporter"]
};
```

Otherwise, simply add `jest-ci-spec-reporter` to your existing array of Jest reporters.

See the [Jest](https://jestjs.io/docs/configuration) documentation for more information about using custom reporters.

## Sample Output

The output of the reporter is searchable in a CI log allowing faster navigation to errors:

```text
Determining test suites to run...
Found 1 test suites.

    [PASS] JestCiSpecReporter > should implement onRunComplete (1ms)
    [PASS] JestCiSpecReporter > should implement onRunStart (0ms)
    [PASS] JestCiSpecReporter > should implement onTestResult (1ms)
    [PASS] JestCiSpecReporter > should implement getLastError (0ms)

Executed 4 of 4 (skipped 0) SUCCESS (0.856 secs)
TOTAL: 4 SUCCESS
```
