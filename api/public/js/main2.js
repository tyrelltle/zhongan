/*global require, requirejs */

'use strict';

requirejs.config({
  paths: {
    'angular': ['../lib/angularjs/angular'],
    'angular-route': ['../lib/angularjs/angular-route'],
    'angular-ui-bootstrap': ['../lib/angular-ui-bootstrap/ui-bootstrap-tpls'],
    'jquery': '../lib/jquery/dist/jquery.min',
      'chart':'../lib/Chart.js/Chart',
      'angular-chart': '../lib/angular-chart.js/angular-chart.min'
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
    },
    'angular-chart':{
      deps: ['angular','chart']
    }
  }
});

define('jquery-private', ['jquery'], function (jq) {
  return jq.noConflict( true );
});



require(['angular',
         'angular-chart',
         'angular-ui-bootstrap',
         './controllers/dashboardCtrls',
         './controllers/projectCtrls',
         './controllers/creditCtrls',
         './controllers/debitCtrls',
         './controllers/analyticsCtrl',
         'jquery-private',
         './directives',
         './filters',
         './services',
         'angular-route'],
  function(angular) {
     // Declare app level module which depends on filters, and services

    angular.module('myApp', ['myApp.project','myApp.credit','myApp.analytics','myApp.debit','ngRoute']).
      config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {templateUrl: 'partials/overview.html', controller: 'logincontroller'});
        $routeProvider.when('/credit', {templateUrl: 'partials/credit.html', controller: 'creditcontroller'});
        $routeProvider.when('/debit', {templateUrl: 'partials/debit.html', controller: 'debitcontroller'});
        $routeProvider.when('/analytics', {templateUrl: 'partials/analytics.html', controller: 'analyticscontroller'});
        $routeProvider.when('/project', {templateUrl: 'partials/project.html', controller: 'projectcontroller'});
        $routeProvider.otherwise({redirectTo: '/'});
      }]);

    angular.bootstrap(document, ['myApp']);

});
