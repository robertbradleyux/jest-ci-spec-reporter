# Zero dependency Jest spec reporter with CI-friendly output

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

## Testing

You can checkout the expected output:

```bash
git clone https://github.com/robertbradleyux/jest-ci-spec-reporter.git
cd jest-ci-spec-reporter
npm ci
npm run build
npm test
```
