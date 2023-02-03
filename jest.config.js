/** @type {import('jest').Config} */

const config = {
    verbose: true, 
    transform: {
        "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": "babel-jest",
        "^.+\\.css$": "<rootDir>/jest/mocks/cssMock.js"
    }
};

module.exports = config; 