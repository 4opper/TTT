'use strict';

angular.
	module('detailed-info', ['common-data']).
	component('detailedInfo', {
		templateUrl: 'detailed-info/detailed-info.template.html',
		controller: ['$scope', '$location', 'commonData', function DetailedInfoController ($scope, $location, commonData) {
			$scope.currentAp = commonData.currentApartment;

			$scope.back = function () {
				if (commonData.inFaves) {
					$location.path('/faves');	
				} else {
					$location.path('search').search(commonData.currentQuery);
				}	
			};

			$scope.toggleFave = function () {
				
				if (!$scope.currentAp.isFave) {
					$scope.currentAp.isFave = true;	
					commonData.currentApartment.faveIndex = commonData.favesCounter;									
					commonData.faves.push($scope.currentAp);
					commonData.favesCounter++;		
				} else {
					delete commonData.faves[commonData.currentApartment.faveIndex];
					$scope.currentAp.isFave = false;
				}
			};
		}
	]});