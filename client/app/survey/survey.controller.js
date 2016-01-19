'use strict';

(function() {

class SurveyController {

  constructor($http,$state) {
    this.BARS_MAX_WIDTH = 500;  // setting 500px as max width for the bars chart

    // injecting dependencies
    this.$http = $http;
    this.$state = $state;

    // setting default $scope vars
    this.selectedWayId = null;
    this.user = null;
    this.ways = [];
    
    // loading commute ways
    $http.get('/api/ways').then(response => {
      this.ways = response.data;
    });
  }

  // helper function used to show the bars in survey results
  styleWay(votes){
    var maxVotes = _.max(this.ways, function(way){ return way.votes; }).votes;
    var pixels = parseInt((votes*this.BARS_MAX_WIDTH)/maxVotes);
    return { width: pixels + 'px' };
  }

  // function to cast a vote
  castVote(){
    if(this.selectedWayId){
      this.$http.post('/api/ways/upvote/'+this.selectedWayId).then(response => {
        this.$state.go("survey-results");
      });
      this.selectedWayId = null;
    }
  }

  goToVote(){
    this.$state.go("survey-vote");
  }

}

angular.module('commuterTestApp')
  .controller('SurveyController', SurveyController);

})();
