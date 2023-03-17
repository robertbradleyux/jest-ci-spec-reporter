import { Reporter } from '@jest/reporters';
import { AggregatedResult, Test, TestContext, TestResult } from '@jest/test-result';

export default class JestCiSpecReporter implements Reporter {

    onRunStart({ numTotalTestSuites }: AggregatedResult) {
        console.log();
        console.log(`Found ${numTotalTestSuites} test suites.`);
        console.log();
    }

    onRunComplete(_: Set<TestContext>, results: AggregatedResult) {
        const { numFailedTests, numPassedTests, numPendingTests, testResults, numTotalTests, startTime } = results;

        testResults.forEach(({ failureMessage }: TestResult) => {
            if (failureMessage) {
                console.log(failureMessage);
            }
        });

        const testResultText = numFailedTests === 0 ? 'SUCCESS' : 'FAILED';
        const numNotSkippedTests = numPassedTests + numFailedTests;
        const runDuration = this._getRunDuration(startTime);

        console.log();
        console.log(`Executed ${numNotSkippedTests} of ${numTotalTests} (skipped ${numPendingTests}) ${testResultText} (${runDuration})`);
        console.log(`TOTAL: ${numNotSkippedTests} ${testResultText}`);
    }

    onTestResult(test: Test, { testResults }: TestResult) {
        testResults.forEach(result => {
            const { title, duration, status, ancestorTitles } = result;
            const { name } = test.context.config?.displayName ?? {};
            if (name) {
                ancestorTitles.unshift(name);
            }
            const breadcrumbs = `${ancestorTitles.join(' > ')} >`;
            console.log(`    ${this._getTestStatus(status)} ${breadcrumbs} ${title} ${this._getTestDuration(duration)}`);
        });
    }

    getLastError() {
        return undefined;
    }

    private _getRunDuration(startTime: number): string {
        const deltaInMillis = new Date().getTime() - new Date(startTime).getTime();
        const seconds = ((deltaInMillis % 60000) / 1000).toFixed(3);
        return `${seconds} secs`;
    }

    private _getTestDuration(duration?: number): string {
        return `\x1b[1m\x1b[30m(${duration ?? 0}ms)\x1b[0m`;
    }

    private _getTestStatus(status: string): string {
        switch (status) {
            case 'passed':
                return '\x1b[1m\x1b[32m[PASS]\x1b[0m';
            case 'pending':
                return '\x1b[1m\x1b[33m[SKIP]\x1b[0m';
            case 'failed':
            default:
                return '\x1b[1m\x1b[31m[FAIL]\x1b[0m';
        }
    }
}
