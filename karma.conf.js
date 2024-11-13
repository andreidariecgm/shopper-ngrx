// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('karma-jasmine'),
      require('karma-jasmine-html-reporter'),
      require('karma-mocha-reporter'),
    ],
    reporters: ['mocha', 'kjhtml'],
    client: {
      clearContext: true, // leave Jasmine Spec Runner output visible in browser
      jasmine: {
        failSpecWithNoExpectations: true
      }
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'),
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },
        { type: 'lcov' }
      ],
      subdir: '.',
      check: {
        global: {
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80,
        }
      },
    },
    mochaReporter: {
      ignoreSkipped: true,
    },
    concurrency: 1,
    port: 9876,
    colors: true,
    logLevel: config.LOG_WARN,
    autoWatch: true,
    browsers: ['ChromeNoSandboxHeadless'],
    singleRun: false,
    browserDisconnectTimeout: 30000,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 30000,
    customLaunchers: {
      ChromeNoSandbox: {
        base: 'Chrome',
        flags: [
          '--no-sandbox'
        ],
      },
      ChromeNoSandboxHeadless: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--headless',
          '--disable-gpu',
          '--remote-debugging-port=9222'
        ],
      }
    },
    browserConsoleLogOptions: {
      level: "warn",
      format: "%m",
      terminal: true
    }
  });
};
