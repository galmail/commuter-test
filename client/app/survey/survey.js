'use strict';

angular.module('commuterTestApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('survey-vote', {
        url: '/survey/vote',
        templateUrl: 'app/survey/survey-vote.html',
        controller: 'SurveyController',
        controllerAs: 'survey'
      })
      .state('survey-results', {
        url: '/survey/results',
        templateUrl: 'app/survey/survey-results.html',
        controller: 'SurveyController',
        controllerAs: 'survey'
      });
  });
