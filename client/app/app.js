'use strict';

angular.module('commuterTestApp', [
  'commuterTestApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/survey/vote');
    $locationProvider.html5Mode(true);
  });
