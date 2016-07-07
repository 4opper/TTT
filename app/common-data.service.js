angular.module('common-data', [])
.factory('commonData', ['$location', function($location) {
    var apartments;
    var searches = [];
    var currentQuery;
    var currentApartment;
    var faves = [];
    var favesCounter = 0;
    var inFaves = false;

    backHome = function () {
        $location.path('/home ');
        inFaves = false;
    };
    
    return {
      apartments: apartments,
      searches: searches,
      currentQuery: currentQuery,
      currentApartment: currentApartment,
      faves: faves,
      favesCounter: favesCounter,
      inFaves: inFaves,
      backHome: backHome
      
    };
}]);