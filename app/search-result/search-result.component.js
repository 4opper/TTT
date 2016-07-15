'use strict';

angular
    .module('search-result', ['common-data', 'ngStorage'])
	.component('searchResult', {
		templateUrl: 'search-result/search-result.template.html',
		controller:  ['$scope', 'commonData', '$localStorage',
		function SearchResultController($scope, commonData, $localStorage) {
			$scope.response = commonData.apartments;
			$scope.backHome = commonData.backHome;

			this.loadMore = function () {
				commonData.page++;
				commonData.getApartments().then(function(response) {
					for (var i = 0, n = response.data.response.listings.length; i < n; i++) {
						$scope.response.listings.push(response.data.response.listings[i]);
					};
				});
			};

			this.showDetails = function ($event) {
				if (!$localStorage.favess) {
					$localStorage.favess = [];
				};

				$scope.apartm = $event.currentTarget.id;
				commonData.inFaves = false;

				commonData.currentApartment = $scope.response.listings.filter(function(item, indx, arr){ 
					return(item.lister_url === $scope.apartm); 
				})[0];

				commonData.faves = $localStorage.favess;

				for (var i = 0, n = commonData.faves.length; i < n; i++) {
					if (commonData.faves[i].lister_url == commonData.currentApartment.lister_url) {
						commonData.currentApartment.isFave = true;
					}
				};
			};
		}] 
	});