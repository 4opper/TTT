'use strict';

angular.
	module('search-result', ['common-data']).
	component('searchResult', {
		templateUrl: 'search-result/search-result.template.html',
		controller:  ['$scope', '$location', 'commonData', '$http', 
		function SearchResultController($scope, $location, commonData, $http) {
			$scope.page = 2;
			$scope.response = commonData.apartments;
			$scope.backHome = commonData.backHome;

			$scope.loadMore = function () {
				$http.get('http://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&page='
				 + $scope.page + '&place_name='+ commonData.currentQuery).then(function(response) {
					for (var i = 0, n = response.data.response.listings.length; i < n; i++) {
						$scope.response.listings.push(response.data.response.listings[i]);
					};	
					$scope.page++;
				});
			};

			$scope.showDetails = function ($event) {
				$scope.apartm = $event.currentTarget.id;
				commonData.inFaves = false;
				commonData.currentApartment = $scope.response.listings.filter(function(item, indx, arr){ return(item.$$hashKey === $scope.apartm ); })[0];

				for (var i = 0, n = commonData.faves.length; i < n; i++) {
					if (commonData.faves[i] && commonData.currentApartment.lister_url == commonData.faves[i].lister_url) {
						commonData.currentApartment.isFave = true;
					}
				};

				$location.url($location.path());
				$location.path('/details');
			}
		}] 
	});