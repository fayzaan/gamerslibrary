angular.module( 'app' )
	.run( [ 'config', '$rootScope', '$q', '$timeout', '$cookies', '$http', '$window', '$location',
	function ( config, $rootScope, $q, $timeout, $cookies, $http, $window, $location ) {
		console.log( 'app.run', config, $rootScope );
} ] );