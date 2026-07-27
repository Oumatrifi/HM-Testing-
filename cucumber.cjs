module.exports = {
  default: {
    paths: ['src/tests/features/hm/**/*.feature'],
    requireModule: ['ts-node/register'],
    require: [
      'src/hooks/**/*.ts',
      'src/tests/step-definitions/**/*.ts'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    format: [
      'progress',
      'summary',
      'html:outputs/reports/cucumber-report.html',
      'json:outputs/reports/cucumber-report.json'
    ],
    publishQuiet: true
  }
};
