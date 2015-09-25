require.config({
  baseUrl: '../src',

  paths: {
    'angular': '../bower_components/angular/angular'
  },

  shim: {
    'angular': {
      exports: 'angular'
    }
  }
});
