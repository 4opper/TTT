'use strict';

angular
	.module('start-page', ['common-data', 'angular-loading-bar', 'ngStorage'])
	.component('startPage', {
		templateUrl: 'start-page/start-page.template.html',
		controller: ['$scope', 'commonData', '$state', 
		function StartPageController($scope, commonData, $state) {
			$scope.rSearches = commonData.searches;
			commonData.page = 1;
			
			this.goFaves = function () {
				commonData.inFaves = true;
			};
			
			this.searchh = function (queryy) {
				if (queryy) {
					commonData.currentQuery = queryy;
					commonData.getApartments().then(function(response) {
			          	commonData.apartments = response.data.response;
			          	$state.go('results', {query: queryy});
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