angular.module( 'config', [] ).value( 'config', {
	'version': '1.0.0',
	'pages': {
		'dashboard': {
			'title': 'Dashboard',
			'roles': [ 'user' ],
			'required': []
		}
	}
} );

angular.module( 'app.controllers', [ 'config' ] );
angular.module( 'app.directives', [ 'config' ] );
angular.module( 'app.factories', [ 'config' ] );
angular.module( 'app.filters', [ 'config' ] );
angular.module( 'app.modules', [ 'config' ] );
angular.module( 'app.services', [ 'config' ] );

angular.module( 'ngModules', [ 'ngAnimate', 'ngCookies', 'ngRoute' ] );

var app = angular.module( 'app', [ 'ngModules', 'mgcrea.ngStrap', 'app.controllers', 'app.directives', 'app.factories', 'app.filters', 'app.services', 'app.modules', 'config' ] );