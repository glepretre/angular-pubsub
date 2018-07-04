// JSHint warns about the official RequireJS config syntax
/* jshint -W030, -W033 */

({
  mainConfigFile: './require.conf.js',
  name:'angular-pubsub',
  out: '../dist/angular-pubsub.js',
  optimize: 'none',
  useStrict: true,
  paths: {
    'angular': 'empty:'
  },
  exclude: []
})
