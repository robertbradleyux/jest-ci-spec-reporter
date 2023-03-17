import { beforeEach, describe, expect, it } from '@jest/globals';
import JestCiSpecReporter from './jest-ci-spec-reporter';

describe('JestCiSpecReporter', () => {

    let reporter: JestCiSpecReporter;

    beforeEach(() => {
        reporter = new JestCiSpecReporter();
    });

    it('should implement onRunComplete', () => {
        expect(reporter.onRunComplete).toBeDefined();
    });

    it('should implement onRunStart', () => {
        expect(reporter.onRunStart).toBeDefined();
    });

    it('should implement onTestResult', () => {
        expect(reporter.onTestResult).toBeDefined();
    });

    it('should implement getLastError', () => {
        expect(reporter.getLastError).toBeDefined();
    });

});
