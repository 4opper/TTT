angular.
	module('PropertyCross').
	config(['$locationProvider', '$routeProvider', function config($locationProvider, $routeProvider) {		
		$locationProvider.hashPrefix('!');

		$routeProvider.
			when('/home', {
				template: '<start-page></start-page>'
			}).
			when('/search?:query', {
				template: '<search-result></search-result>'
			}).
			when('/details', {
				template: '<detailed-info></detailed-info>'
			}).
			when('/faves', {
				template: '<faves></faves>'
			}).
			otherwise('/home')
	}
]);