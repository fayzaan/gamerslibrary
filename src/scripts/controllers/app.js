angular.module( 'app.controllers' )
	.controller( 'AppCtrl', [ 'config', function ( config ) {
		console.log( 'AppCtrl', config );
} ] );