'use strict';

angular
	.module('faves', ['common-data'])
	.component('faves', {
		templateUrl: 'faves/faves.template.html',
		controller: ['$scope', 'commonData', '$state',
		function favesController ($scope, commonData, $state) {
			$scope.faveAparts = commonData.faves;
			$scope.backHome = commonData.backHome;

			this.showDetails = function ($event) {
				$scope.apartm = $event.currentTarget.id;
				commonData.currentApartment = $scope.faveAparts.filter(function(item, indx, arr){ 
					if (item) {
						return(item.lister_url === $scope.apartm); 
					}				
				})[0];

				for (var i = 0, n = commonData.faves.length; i < n; i++) {
					if (commonData.faves[i].lister_url == commonData.faves[i].lister_url) {
						commonData.currentApartment.isFave = true;
					}
				};

				$state.go('details');
			}
		}]		
	});