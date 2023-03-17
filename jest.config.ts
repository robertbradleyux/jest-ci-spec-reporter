module.exports = {
    displayName: 'jest-ci-spec-reporter',
    reporters: ['<rootDir>/dist/index.js'],
    transform: {
        '^.+\\.ts$': 'ts-jest'
    }
};
