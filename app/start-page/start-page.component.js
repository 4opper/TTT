'use strict';

angular.
	module('start-page', ['common-data', 'angular-loading-bar']).
	component('startPage', {
		templateUrl: 'start-page/start-page.template.html',
		controller: ['$scope', '$http', '$location', 'commonData', function StartPageController($scope, $http, $location, commonData) {
			$scope.rSearches = commonData.searches;
			
			$scope.goFaves = function () {
				$location.path('/faves');
				commonData.inFaves = true;
				console.log(commonData.inFaves);
			}
			
			$scope.searchh = function (queryy) {
				if (queryy) {

					commonData.currentQuery = queryy;
					$http.get('http://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&page=1&place_name='
					+ queryy).then(function(response) {
			          	commonData.apartments = response.data.response;
			          	$location.path('search').search(queryy);

			          	commonData.searches.push({
			          		query: queryy,
			          		results: response.data.response.total_results 
			          	}); 
	
		          	}, function (response) {
		          		$scope.error = 'An error occurred while searching. Please check your network connection and try again.'
		          	})				
				} else {
					$scope.error = 'Please enter your search query.';
				}
			};
		}
	]});