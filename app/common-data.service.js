angular.module('common-data', ['ngStorage'])
    .factory('commonData', ['$q', '$localStorage', '$state', '$http',
    function($q, $localStorage, $state, $http) {
        var apartments;
        var searches = [];
        var currentQuery;
        var currentApartment;
        var faves = $localStorage.favess;
        var inFaves = false;

        backHome = function () {
            $state.go('home');
            inFaves = false;
        };
    
        return {
            apartments: apartments,
            searches: searches,
            currentQuery: currentQuery,
            currentApartment: currentApartment,
            faves: faves,
            inFaves: inFaves,
            backHome: backHome,
            getApartments: function () {
              var deferred = $q.defer();
              if (!apartments) {
                return $http.get('http://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&page='
                 + this.page + '&place_name='+ this.currentQuery)
              };
              return $q.resolve(apartments);
          }        
        };
}]);

