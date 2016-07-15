'use strict';

angular
	.module('detailed-info', ['common-data', ])
	.component('detailedInfo', {
		templateUrl: 'detailed-info/detailed-info.template.html',
		controller: ['$scope', 'commonData', '$localStorage', '$state',
		function DetailedInfoController ($scope, commonData, $localStorage, $state) {
			$scope.currentAp = commonData.currentApartment;

			this.back = function () {
				if (commonData.inFaves) {
					$state.go('faves')	
				} else {
					$state.go('results', {query: commonData.currentQuery})
				}	
			};

			this.toggleFave = function () {
				if (!$scope.currentAp.isFave) {
					$scope.currentAp.isFave = true;					
					$localStorage.favess.push($scope.currentAp);
				} else {
					var index = $localStorage.favess.findIndex(x => x.lister_url == $scope.currentAp.lister_url);			
					$localStorage.favess.splice(index, 1);
					$scope.currentAp.isFave = false;
				};
			};
		}
	]});
