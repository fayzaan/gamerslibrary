angular.module( 'app' )
	.config( [ '$routeProvider', '$httpProvider', function ( $routeProvider, $httpProvider ) {
		$httpProvider.defaults.withCredentials = true;

		var _view = 'views/',
			_app_ = 'app/';

		$routeProvider
			.when( '/dashboard', {
				templateUrl: 'views/dashboard.html'
			} )
			.when( '/game/:id', {
				templateUrl: 'views/game.details.html'
			} )
			.otherwise( {
				redirectTo: '/dashboard'
		} );
} ] );