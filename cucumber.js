module.exports = {
  default: {
    requireModule: ['@babel/register'],
    require: ['features/step_definitions/*.js', 'features/support/*.js'],
    format: ['progress-bar', 'html:cucumber-report.html'],
    paths: ['features/*.feature']
  }
} 