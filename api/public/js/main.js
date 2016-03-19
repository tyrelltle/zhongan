/*global require, requirejs */

'use strict';

requirejs.config({
  paths: {
    'angular': ['../lib/angularjs/angular'],
    'angular-route': ['../lib/angularjs/angular-route'],
    'angular-ui-bootstrap': ['../lib/angular-ui-bootstrap/ui-bootstrap'],
    'jquery': '../lib/jquery/dist/jquery.min'
  },
  shim: {
    'angular': {
      exports : 'angular'
    },
    'angular-route': {
      deps: ['angular'],
      exports : 'angular'
    },
    'angular-ui-bootstrap': {
      deps: ['angular']
    }
  }
});

define('jquery-private', ['jquery'], function (jq) {
  return jq.noConflict( true );
});

require(['angular',
         'angular-ui-bootstrap',
         './controllers/loginCtrls',
         'jquery-private',
         './directives',
         './filters',
         './services',
         'angular-route'],
  function(angular) {
     // Declare app level module which depends on filters, and services

    angular.module('myApp', ['myApp.filters','myApp.login', 'myApp.services', 'myApp.directives', 'ngRoute']).
      config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'logincontroller'});
        $routeProvider.otherwise({redirectTo: '/login'});
      }]);

    angular.bootstrap(document, ['myApp']);

});
