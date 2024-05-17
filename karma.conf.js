var webpackconfig = require('@vue/cli-service/webpack.config');

module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],
    files: ['tests/**/*.spec.js'],
    preprocessors: {
      '**/*.spec.js': ['webpack', 'sourcemap']
    },
    autoWatch: true,
    webpack: webpackconfig,
    reporters: ['spec'],
    browsers: ['ChromeHeadless'],
  });
};