import { afterEach, beforeEach, describe, expect, jest, it } from '@jest/globals';
import { AggregatedResult, AssertionResult, Test, TestContext, TestResult } from '@jest/test-result';
import { SpiedFunction } from 'jest-mock';
import JestCiSpecReporter from './jest-ci-spec-reporter';

describe('JestCiSpecReporter', () => {

    const TEST_RESULT: AggregatedResult = {
        numFailedTests: 2,
        numFailedTestSuites: 1,
        numPassedTests: 32,
        numPassedTestSuites: 4,
        numPendingTests: 0,
        numTodoTests: 0,
        numPendingTestSuites: 0,
        numRuntimeErrorTestSuites: 0,
        numTotalTests: 34,
        numTotalTestSuites: 5,
        openHandles: [],
        snapshot: undefined,
        startTime: new Date().getTime(),
        success: false,
        testResults: [],
        wasInterrupted: false
    };

    let reporter: JestCiSpecReporter;
    let logSpy: SpiedFunction;

    beforeEach(() => {
        reporter = new JestCiSpecReporter();
        logSpy = jest.spyOn(global.console, 'log')
            .mockImplementation(() => { });
    });

    afterEach(() => {
        logSpy.mockRestore();
    });

    it('should implement onRunComplete', () => {
        const testResultText = TEST_RESULT.numFailedTests === 0 ? 'SUCCESS' : 'FAILED';
        const numNotSkippedTests = TEST_RESULT.numPassedTests + TEST_RESULT.numFailedTests;
        expect(reporter.onRunComplete).toBeDefined();
        reporter.onRunComplete(new Set<TestContext>(), TEST_RESULT);
        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledTimes(3);
        expect(logSpy).toHaveBeenNthCalledWith(2, expect.stringContaining(`Executed ${numNotSkippedTests} of ${TEST_RESULT.numTotalTests} (skipped ${TEST_RESULT.numPendingTests}) ${testResultText}`));
        expect(logSpy).toHaveBeenNthCalledWith(3,`TOTAL: ${numNotSkippedTests} ${testResultText}`);
    });

    it('should implement onRunStart', () => {
        expect(reporter.onRunStart).toBeDefined();
        reporter.onRunStart(TEST_RESULT);
        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledTimes(3);
        expect(logSpy).toHaveBeenCalledWith(`Found ${TEST_RESULT.numTotalTestSuites} test suites.`);
    });

    it('should implement onTestResult', () => {
        const fakeTest: Test = {
            context: {
                config: undefined,
                hasteFS: undefined,
                moduleMap: undefined,
                resolver: undefined
            },
            path: ''
        };
        const fakeAssertionResult: AssertionResult = {
            title: 'TEST_NAME',
            duration: 0,
            status: 'failed',
            ancestorTitles: [
                'COMPONENT_NAME',
                'FEATURE_NAME'
            ],
            failureDetails: [],
            failureMessages: [],
            fullName: '',
            numPassingAsserts: 0
        };
        const fakeTestResult: TestResult = {
            leaks: false,
            numFailingTests: 0,
            numPassingTests: 0,
            numPendingTests: 0,
            numTodoTests: 0,
            openHandles: [],
            perfStats: undefined,
            skipped: false,
            snapshot: undefined,
            testFilePath: '',
            testResults: [
                fakeAssertionResult
            ]
        };
        const breadcrumbs = `${fakeAssertionResult.ancestorTitles.join(' > ')} >`;
        expect(reporter.onTestResult).toBeDefined();
        reporter.onTestResult(fakeTest, fakeTestResult);
        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(`${breadcrumbs} ${fakeAssertionResult.title}`));
    });

    it('should implement getLastError', () => {
        expect(reporter.getLastError).toBeDefined();
        expect(reporter.getLastError()).toBeUndefined();
        expect(logSpy).not.toHaveBeenCalled();
    });

});
