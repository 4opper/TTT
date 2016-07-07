'use strict';

angular.
	module('faves', ['common-data']).
	component('faves', {
		templateUrl: 'faves/faves.template.html',
		controller: ['$scope', '$location', 'commonData', function favesController ($scope, $location, commonData) {
			$scope.faveAparts = commonData.faves;
			$scope.backHome = commonData.backHome;

			$scope.showDetails = function ($event) {
				$scope.apartm = $event.currentTarget.id;
				commonData.currentApartment = $scope.faveAparts.filter(function(item, indx, arr){ return(item.$$hashKey === $scope.apartm ); })[0];

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