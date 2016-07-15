angular
	.module('PropertyCross')
	.config(['$stateProvider', '$urlRouterProvider', 
		function config($stateProvider , $urlRouterProvider) {		

		$urlRouterProvider.otherwise('/home');

		$stateProvider
			.state('home', {
				url: '/home',
				template: '<start-page></start-page>'
			})
			.state('faves', {
				url: '/faves',
				template: '<faves></faves>'
			})
			.state('results', {
				params: {
            		query: null
        		},				
				url: '/results?:{query}',
				template: '<search-result></search-result>',

			})
			.state('details', {
				url: '/details',
				template: '<detailed-info></detailed-info>'
			})
		}
]);